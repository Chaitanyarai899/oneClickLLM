# 🌟 One-Click LLM

One-Click LLM is an open-source solution that lets you deploy and run any LLM (Large Language Model) of your choice in the form of an API, compatible with the OpenAI library. It's a drop-in replacement for your projects that utilize the OpenAI library or any other API/library for LLMs.

With just a few clicks on the Web UI, you can select your preferred LLM, deploy it, and receive a custom Docker Compose file. This file can be run on any platform of your choice, such as an EC2 instance on AWS, Elastic Beanstalk, or a VM on Azure or GCP. 🚀

---

## 📚 Features

- **Easy Deployment**: Deploy your LLM with just one click.
- **Custom Docker Compose**: Automatically generate a Docker Compose file for your chosen LLM.
- **Cloud Agnostic**: Run your LLM on any platform - AWS, Azure, GCP, or your local machine.
- **Open Source**: Contribute to the project, raise PRs for new features, or suggest improvements.
- **Astro Project**: Built using Astro, providing a fast and optimized development experience.

![image](https://github.com/user-attachments/assets/fa68da8f-5517-46bf-b08a-7361085c730e)

---

## 🛠️ Tech Stack

- **Astro**: Frontend framework
- **Docker**: Containerization
- **Node.js**: Backend server
- **Shell Scripting**: COnfiguration
- **AWS, Azure, GCP**: Deployment options

---

## 🚀 Quick Start

### Prerequisites

- Node.js installed
- Git installed

### Steps to Build Locally

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/Chaitanyarai899/oneClickLLM
   ```
   
2. **Navigate to the Directory**:  
   ```bash
   cd oneClickLLM
   ```
   
3. **Install Dependencies**:  
   ```bash
   npm install
   ```
   
4. **Run the Development Server**:  
   ```bash
   npm run dev
   ```
   
Now, your project is up and running locally! 🎉

---

## 🌍 Deploying on Your Own

If you wish to deploy this project on your own infrastructure:

1. **Build the Project**:  
   ```bash
   npm run build
   ```

2. **Deploy the Project**:  
   Deploy the project on any platform of your choice - AWS EC2, Azure VM, GCP VM, etc.

---

## 💻 Usage

1. **Go to the Web UI**:  
   Open the browser and navigate to the Web UI.

2. **Select LLM**:  
   Choose the LLM of your choice from the list.

3. **Deploy**:  
   Hit deploy, and you will receive a custom Docker Compose file.

4. **Run Anywhere**:  
   Use the Compose file on any platform to run the LLM.

---

## 🤝 Contributing

We welcome contributions! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a PR.

Feel free to raise a PR for any new feature or improvements. Let's build something amazing together! 🚀

---

## 📜 License

This project is licensed under the MIT License.

---

## End Point Documentation 📚

### Streamling LLM Infrence API Deployment on Akash Network via Ollama, vLLM and Llama-cpp

## Endpoints

- [Generate a completion](#generate-a-completion)
- [Generate a chat completion](#generate-a-chat-completion)
- [List loaded Models](#list-loaded-models)
- [Show Model Information](#show-model-information)

## Conventions

### Model names

Model names follow a `model:tag` format, where `model` can have an optional namespace such as `example/model`. Some examples are `phi3` and `llama3:70b`. The tag is optional and, if not provided, will default to `latest`. The tag is used to identify a specific version.

### Durations

All durations are returned in nanoseconds.

### Streaming responses

Certain endpoints stream responses as JSON objects and can optional return non-streamed responses.

## Generate a completion

```shell
POST /api/generate
```

Generate a response for a given prompt with a provided model. This is a streaming endpoint, so there will be a series of responses. The final response object will include statistics and additional data from the request.

### Parameters

- `model`: (required) the [model name](#model-names)
- `prompt`: the prompt to generate a response for
- `images`: (optional) a list of base64-encoded images (for multimodal models such as `llava`)

### Examples

#### Generate request (Streaming)

##### Request

```shell
curl http://baseAkashUrl/api/generate -d '{
  "model": "llama3",
  "prompt": "What is quantum mechanics?"
}'
```

##### Response

A stream of JSON objects is returned:

```json
{
  "model": "llama3",
  "created_at": "2023-08-04T08:52:19.385406455-07:00",
  "response": "The",
  "done": false
}
```

The final response in the stream also includes additional data about the generation:

- `total_duration`: time spent generating the response
- `load_duration`: time spent in nanoseconds loading the model
- `prompt_eval_count`: number of tokens in the prompt
- `prompt_eval_duration`: time spent in nanoseconds evaluating the prompt
- `eval_count`: number of tokens in the response
- `eval_duration`: time in nanoseconds spent generating the response
- `context`: an encoding of the conversation used in this response, this can be sent in the next request to keep a conversational memory
- `response`: empty if the response was streamed, if not streamed, this will contain the full response

#### Request (No streaming)

##### Request

A response can be received in one reply when streaming is off.

```shell
curl http://baseAkashUrl/api/generate -d '{
  "model": "llama3",
  "prompt": "What is quantum mechanics?",
  "stream": false
}'
```

##### Response

If `stream` is set to `false`, the response will be a single JSON object:

```json
{
  "model": "llama3",
  "created_at": "2023-08-04T19:22:45.499127Z",
  "response": "It is a field of physics dealing with sub atomic particles.",
  "done": true,
  "context": [1, 2, 3],
  "total_duration": 5043500667,
  "load_duration": 5025959,
  "prompt_eval_count": 26,
  "prompt_eval_duration": 325953000,
  "eval_count": 290,
  "eval_duration": 4709213000
}
```

#### Request (JSON mode)

> When `format` is set to `json`, the output will always be a well-formed JSON object. It's important to also instruct the model to respond in JSON.

##### Request

```shell
curl http://baseAkashUrl/api/generate -d '{
  "model": "llama3",
  "prompt": "What color is the sky at different times of the day? Respond using JSON",
  "format": "json",
  "stream": false
}'
```

##### Response

```json
{
  "model": "llama3",
  "created_at": "2023-11-09T21:07:55.186497Z",
  "response": "{\n\"morning\": {\n\"color\": \"blue\"\n},\n\"noon\": {\n\"color\": \"blue-gray\"\n},\n\"afternoon\": {\n\"color\": \"warm gray\"\n},\n\"evening\": {\n\"color\": \"orange\"\n}\n}\n",
  "done": true,
  "context": [1, 2, 3],
  "total_duration": 4648158584,
  "load_duration": 4071084,
  "prompt_eval_count": 36,
  "prompt_eval_duration": 439038000,
  "eval_count": 180,
  "eval_duration": 4196918000
}
```

The value of `response` will be a string containing JSON similar to:

```json
{
  "morning": {
    "color": "blue"
  },
  "noon": {
    "color": "blue-gray"
  },
  "afternoon": {
    "color": "warm gray"
  },
  "evening": {
    "color": "orange"
  }
}
```

#### Generate request (With options)

If you want to set custom options for the model at runtime rather than in the Modelfile, you can do so with the `options` parameter. This example sets every available option, but you can set any of them individually and omit the ones you do not want to override.

##### Request

```shell
curl http://baseAkashUrl/api/generate -d '{
  "model": "llama3",
  "prompt": "Why is the sky blue?",
  "stream": false,
  "options": {
    "num_keep": 5,
    "seed": 42,
    "num_predict": 100,
    "top_k": 20,
    "top_p": 0.9,
    "tfs_z": 0.5,
    "typical_p": 0.7,
    "repeat_last_n": 33,
    "temperature": 0.8,
    "repeat_penalty": 1.2,
    "presence_penalty": 1.5,
    "frequency_penalty": 1.0,
    "mirostat": 1,
    "mirostat_tau": 0.8,
    "mirostat_eta": 0.6,
    "penalize_newline": true,
    "stop": ["\n", "user:"],
    "numa": false,
    "num_ctx": 1024,
    "num_batch": 2,
    "num_gpu": 1,
    "main_gpu": 0,
    "low_vram": false,
    "f16_kv": true,
    "vocab_only": false,
    "use_mmap": true,
    "use_mlock": false,
    "num_thread": 8
  }
}'
```

##### Response

```json
{
  "model": "llama3",
  "created_at": "2023-08-04T19:22:45.499127Z",
  "response": "The sky is blue because it is the color of the sky.",
  "done": true,
  "context": [1, 2, 3],
  "total_duration": 4935886791,
  "load_duration": 534986708,
  "prompt_eval_count": 26,
  "prompt_eval_duration": 107345000,
  "eval_count": 237,
  "eval_duration": 4289432000
}
```

#### Load a model

If an empty prompt is provided, the model will be loaded into memory.

##### Request

```shell
curl http://baseAkashUrl/api/generate -d '{
  "model": "llama3"
}'
```

##### Response

A single JSON object is returned:

```json
{
  "model": "llama3",
  "created_at": "2023-12-18T19:52:07.071755Z",
  "response": "",
  "done": true
}
```

## Generate a chat completion

```shell
POST /api/chat
```

Generate the next message in a chat with a provided model. This is a streaming endpoint, so there will be a series of responses. Streaming can be disabled using `"stream": false`. The final response object will include statistics and additional data from the request.

### Parameters

- `model`: (required) the [model name](#model-names)
- `messages`: the messages of the chat, this can be used to keep a chat memory

The `message` object has the following fields:

- `role`: the role of the message, either `system`, `user` or `assistant`
- `content`: the content of the message
- `images` (optional): a list of images to include in the message (for multimodal models such as `llava`)

### Examples

#### Chat Request (Streaming)

##### Request

Send a chat message with a streaming response.

```shell
curl http://baseAkashUrl/api/chat -d '{
  "model": "llama3",
  "messages": [
    {
      "role": "user",
      "content": "why is the sky blue?"
    }
  ]
}'
```

##### Response

A stream of JSON objects is returned:

```json
{
  "model": "llama3",
  "created_at": "2023-08-04T08:52:19.385406455-07:00",
  "message": {
    "role": "assistant",
    "content": "The",
    "images": null
  },
  "done": false
}
```

Final response:

```json
{
  "model": "llama3",
  "created_at": "2023-08-04T19:22:45.499127Z",
  "done": true,
  "total_duration": 4883583458,
  "load_duration": 1334875,
  "prompt_eval_count": 26,
  "prompt_eval_duration": 342546000,
  "eval_count": 282,
  "eval_duration": 4535599000
}
```

#### Chat request (No streaming)

##### Request

```shell
curl http://baseAkashUrl/api/chat -d '{
  "model": "llama3",
  "messages": [
    {
      "role": "user",
      "content": "why is the sky blue?"
    }
  ],
  "stream": false
}'
```

##### Response

```json
{
  "model": "lama3:latest",
  "created_at": "2023-12-12T14:13:43.416799Z",
  "message": {
    "role": "assistant",
    "content": "Hello! How are you today?"
  },
  "done": true,
  "total_duration": 5191566416,
  "load_duration": 2154458,
  "prompt_eval_count": 26,
  "prompt_eval_duration": 383809000,
  "eval_count": 298,
  "eval_duration": 4799921000
}
```

## List Loaded Models

```shell
GET /api/tags
```

List models that are available locally.

### Examples

#### Request

```shell
curl http://baseAkashUrl/api/tags
```

#### Response

A single JSON object will be returned.

```json
{
  "models": [
    {
      "name": "codellama:13b",
      "modified_at": "2023-11-04T14:56:49.277302595-07:00",
      "size": 7365960935,
      "digest": "9f438cb9cd581fc025612d27f7c1a6669ff83a8bb0ed86c94fcf4c5440555697",
      "details": {
        "format": "gguf",
        "family": "llama",
        "families": null,
        "parameter_size": "13B",
        "quantization_level": "Q4_0"
      }
    },
    {
      "name": "llama3:latest",
      "modified_at": "2023-12-07T09:32:18.757212583-08:00",
      "size": 3825819519,
      "digest": "fe938a131f40e6f6d40083c9f0f430a515233eb2edaa6d72eb85c50d64f2300e",
      "details": {
        "format": "gguf",
        "family": "llama",
        "families": null,
        "parameter_size": "7B",
        "quantization_level": "Q4_0"
      }
    }
  ]
}
```

## Show Model Information

```shell
POST /api/show
```

Show information about a model including details, modelfile, template, parameters, license, and system prompt.

### Parameters

- `name`: name of the model to show

### Examples

#### Request

```shell
curl http://baseAkashUrl/api/show -d '{
  "name": "llama3"
}'
```

If you have any suggestions or need assistance, don't hesitate to reach out! 😊
