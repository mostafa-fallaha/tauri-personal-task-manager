use chrono::prelude::*;

pub fn get_local_date() -> DateTime<Local> {
    let local: DateTime<Local> = Local::now();
    return local;
}
