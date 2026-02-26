use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
    // Calculate sums and return response
    let mut response = DataResponse {
        string_len: 0,
        int_sum: 0
    };

    request.data
        .iter()
        .for_each(|v| match v {
            DataValue::Integer(num) => response.int_sum += num,
            DataValue::String(text) => {
                let length = str::len(text) as u64;
                response.string_len += length;
            },
        });

    (StatusCode::OK, Json(response))
}

#[derive(Deserialize)]
#[serde(untagged)]
enum DataValue {
    Integer(i64),
    String(String)
}

#[derive(Deserialize)]
pub struct DataRequest {
    data: Vec<DataValue>
}

#[derive(Serialize)]
pub struct DataResponse {
    string_len: u64,
    int_sum: i64
}
