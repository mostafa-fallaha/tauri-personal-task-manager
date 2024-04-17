pub mod entities;

extern crate dirs;

use std::path::PathBuf;

use super::utils::date;
use entities::task;

use sea_orm::{
    ConnectionTrait, Database, DatabaseBackend, DatabaseConnection, EntityTrait, Schema, Set,
};

async fn create_default_task(connection: &DatabaseConnection) -> Result<(), String> {
    let date_added = date::get_local_date();

    let task_one = task::ActiveModel {
        title: Set("title 1".to_string()),
        text: Set("first task".to_string()),
        task_done: Set(false),
        duration: Set("00:00:00".to_string()),
        date_added: Set(Some(date_added)),
        ..Default::default()
    };

    task::Entity::insert(task_one)
        .exec(connection)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

fn create_adta_folder() -> Result<PathBuf, String> {
    let home_dir = dirs::home_dir();

    match home_dir {
        Some(home_dir) => {
            let db_dir = home_dir.join(".adta");
            std::fs::create_dir_all(&db_dir).map_err(|e| e.to_string())?;
            Ok(db_dir)
        }
        None => Err("Could not get home directory".to_owned()),
    }
}

pub async fn get_connection() -> Result<DatabaseConnection, String> {
    let adta_folder = create_adta_folder();

    let db = format!(
        "sqlite:{}?mode=rwc",
        adta_folder?.join("adta.db").to_str().unwrap()
    );

    let connection = Database::connect(db).await.map_err(|e| e.to_string())?;

    let db_sqlite = DatabaseBackend::Sqlite;
    let schema = Schema::new(db_sqlite);
    let st = db_sqlite.build(&schema.create_table_from_entity(task::Entity));

    let created = connection.execute(st).await;

    // this means the create statement worked, and the default to-dos should be added
    if created.is_ok() {
        create_default_task(&connection).await?;
    }

    Ok(connection)
}
