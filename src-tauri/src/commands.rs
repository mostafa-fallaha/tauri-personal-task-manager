use crate::db;

use super::db::entities::task;
use super::utils::date;

use futures::executor::block_on;
use sea_orm::entity::prelude::*;
use sea_orm::{Order, QueryOrder, Set, TryIntoModel};

#[tauri::command(async)]
pub async fn test_connection() -> Result<(), String> {
    match block_on(super::db::get_connection()) {
        Err(err) => Err(format!("{:?}", err)),
        _ => Ok(()),
    }
}

#[tauri::command(async)]
pub async fn get_tasks() -> Result<Vec<task::Model>, String> {
    // let state = app.state::<AppState>();
    // let connection = &state.0;

    let connection = block_on(db::get_connection()).unwrap();

    match task::Entity::find()
        .order_by(task::Column::TaskDone, Order::Asc)
        .order_by(task::Column::DateAdded, Order::Desc)
        .all(&connection)
        .await
    {
        Ok(tasks) => Ok(tasks),
        Err(err) => Err(format!("{:?}", err)),
    }
}

#[tauri::command(async)]
pub async fn insert_task(new_text: &str, new_duration: &str) -> Result<task::Model, String> {
    let connection = block_on(db::get_connection()).unwrap();

    let date_added = date::get_local_date();

    let new_task = task::ActiveModel {
        text: Set(new_text.to_string()),
        task_done: Set(false),
        duration: Set(new_duration.to_string()),
        date_added: Set(Some(date_added)),
        ..Default::default()
    };

    let res = task::Entity::insert(new_task.clone())
        .exec(&connection)
        .await;

    match res {
        Ok(val) => {
            let n = task::ActiveModel {
                id: sea_orm::ActiveValue::Set(val.last_insert_id),
                text: new_task.text,
                task_done: new_task.task_done,
                duration: new_task.duration,
                date_added: new_task.date_added,
            };
            let new_task_3 = n.try_into_model().unwrap();
            Ok(new_task_3)
        }
        Err(err) => Err(format!("{:?}", err)),
    }
}

#[tauri::command(async)]
pub async fn delete_task(id: i32) -> Result<Vec<task::Model>, String> {
    let connection = block_on(db::get_connection()).unwrap();

    let res = task::Entity::delete_many()
        .filter(task::Column::Id.eq(id))
        .exec(&connection)
        .await;
    match res {
        Ok(_val) => {
            let tasks = get_tasks().await;

            match tasks {
                Ok(val) => Ok(val),
                Err(err) => Err(format!("{:?}", err)),
            }
        }
        Err(err) => Err(format!("{:?}", err)),
    }
}

#[tauri::command(async)]
pub async fn set_task_status(id: i32, task_done: bool) -> Result<Vec<task::Model>, String> {
    let connection = block_on(db::get_connection()).unwrap();

    let model = task::Entity::find_by_id(id).one(&connection).await;

    let mut active_model: task::ActiveModel = match model {
        Ok(val) => val.unwrap().into(),
        Err(err) => return Err(format!("{:?}", err)),
    };

    active_model.task_done = Set(task_done);

    match active_model.update(&connection).await {
        Ok(_val) => {
            let tasks = get_tasks().await;

            match tasks {
                Ok(val) => Ok(val),
                Err(err) => Err(format!("{:?}", err)),
            }
        }
        Err(err) => Err(format!("{:?}", err)),
    }
}