// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod commands;
mod commands_cat;
mod db;
mod utils;

// use futures::executor::block_on;
// use sea_orm::DatabaseConnection;
// use tauri::{Manager, State};
// use tokio;

// pub struct AppState(DatabaseConnection);

fn main() {
    // let connection = block_on(db::get_connection()).unwrap();
    // block_on(commands::create_tasks_schema()).unwrap();

    tauri::Builder::default()
        // .manage(AppState(connection))
        .invoke_handler(tauri::generate_handler![
            commands::test_connection,
            commands::get_tasks,
            commands::insert_task,
            commands::delete_task,
            commands::set_task_status,
            commands::update_task,
            // commands::get_categories,
            commands_cat::get_categories,
            commands_cat::insert_category,
            commands_cat::delete_category,
            commands_cat::update_category
        ])
        // .setup(|_app| {
        //     // Initialize the database.
        //     // let _connection = block_on(db::get_connection_tasks()).unwrap();
        //     // Ok(())
        // })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
