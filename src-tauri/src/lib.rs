use reqwest::Client;
use reqwest::multipart;
use serde::{Deserialize, Serialize};
use tauri::command;

#[derive(Serialize, Deserialize)]
struct PredictionResponse {
    result: String,
    confidence: String,
}

#[derive(Serialize, Deserialize)]
struct ErrorResponse {
    error: String,
}

#[command]
async fn predict_image(image: String) -> Result<String, String> {
    let client = Client::new();
    let url = "https://whiskersapi-1199f3802ddf.herokuapp.com/upload"; // Replace with your actual URL

    // Create a multipart form
    let form = multipart::Form::new()
        .text("name", "image")
        .part("file", multipart::Part::bytes(base64::decode(&image).unwrap())
            .file_name("image.png")
            .mime_str("image/png").unwrap());

    let response = client
        .post(url)
        .multipart(form)
        .send()
        .await;

    match response {
        Ok(resp) => {
            let status = resp.status();
            let content_type = resp.headers().get("content-type").and_then(|v| v.to_str().ok()).unwrap_or("").to_string();
            let body = resp.text().await.map_err(|e| e.to_string())?;

            if status.is_success() {
                if content_type.contains("application/json") {
                    let prediction: PredictionResponse = serde_json::from_str(&body).map_err(|e| e.to_string())?;
                    Ok(format!(
                        "Result: {}, Confidence: {}",
                        prediction.result, prediction.confidence
                    ))
                } else {
                    Ok(body) // Handle non-JSON success response
                }
            } else {
                if content_type.contains("application/json") {
                    let error: ErrorResponse = serde_json::from_str(&body).map_err(|e| e.to_string())?;
                    Err(error.error)
                } else {
                    Err(body) // Handle non-JSON error response
                }
            }
        }
        Err(e) => Err(e.to_string()),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![predict_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
