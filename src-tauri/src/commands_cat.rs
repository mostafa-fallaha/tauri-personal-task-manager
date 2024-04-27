use futures::executor::block_on;
use sea_orm::{ActiveModelTrait, EntityTrait, Set, TryIntoModel};

use super::db::entities::category;
use crate::db;

#[tauri::command(async)]
pub async fn _test_connection_categories() -> Result<(), String> {
    match block_on(super::db::get_connection_categories()) {
        Err(err) => Err(format!("{:?}", err)),
        _ => Ok(()),
    }
}

#[tauri::command(async)]
pub async fn get_categories() -> Result<Vec<category::Model>, String> {
    let connection = block_on(db::get_connection_categories()).unwrap();

    match category::Entity::find().all(&connection).await {
        Ok(categories) => Ok(categories),
        Err(err) => Err(format!("{:?}", err)),
    }
}

#[tauri::command(async)]
pub async fn insert_category(title: &str) -> Result<category::Model, String> {
    let connection = block_on(db::get_connection_categories()).unwrap();
    let new_cat = category::ActiveModel {
        title: Set(title.to_string()),
        ..Default::default()
    };

    let res = category::Entity::insert(new_cat.clone())
        .exec(&connection)
        .await;

    match res {
        Ok(val) => {
            let temp_cat = category::ActiveModel {
                id: Set(val.last_insert_id),
                title: new_cat.title,
            };
            let last_added_category = temp_cat.try_into_model().unwrap();
            Ok(last_added_category)
        }
        Err(err) => {
            println!("insertion error: {:?}", err);
            Err(format!("{:?}", err))
        }
    }
}

#[tauri::command(async)]
pub async fn delete_category(id: i32) -> Result<(), String> {
    let connection = block_on(db::get_connection_categories()).unwrap();

    let res = category::Entity::delete_by_id(id).exec(&connection).await;

    match res {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("{:?}", err)),
    }
}

#[tauri::command(async)]
pub async fn update_category(id: i32, new_title: &str) -> Result<Vec<category::Model>, String> {
    let connection = block_on(db::get_connection_categories()).unwrap();

    let model = category::Entity::find_by_id(id).one(&connection).await;

    let mut active_model: category::ActiveModel = match model {
        Ok(val) => val.unwrap().into(),
        Err(err) => return Err(format!("{:?}", err)),
    };

    active_model.title = Set(new_title.to_string());

    match active_model.update(&connection).await {
        Ok(_) => {
            let categories = get_categories().await;
            match categories {
                Ok(val) => Ok(val),
                Err(err) => Err(format!("{:?}", err)),
            }
        }
        Err(err) => Err(format!("{:?}", err)),
    }
}
