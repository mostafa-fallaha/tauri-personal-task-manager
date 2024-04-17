// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

mod commands;
mod db;
mod utils;

// use futures::executor::block_on;
// use sea_orm::DatabaseConnection;
// use tauri::{Manager, State};
// use tokio;

// pub struct AppState(DatabaseConnection);

fn main() {
    // let connection = block_on(db::get_connection()).unwrap();

    tauri::Builder::default()
        // .manage(AppState(connection))
        .invoke_handler(tauri::generate_handler![
            commands::test_connection,
            commands::get_tasks,
            commands::insert_task,
            commands::delete_task,
            commands::set_task_status
        ])
        // .setup(|_app| {
        //     // Initialize the database.
        //     let _ = block_on(db::get_connection()).unwrap();
        //     Ok(())
        // })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
