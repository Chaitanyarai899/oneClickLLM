---
title: Free Demo inference API
description: Try out these endpoints before deploying your own
---

In order to promote the spirit of open source, we are providing this free API endpoint which contains llava-phi3, llama2-7b and Mistril-7b. You can use the endpoints to play around and get familiar with the endpoints before you decide to deploy your private LLM inference API. The endpoints are openAI library compatible and can be used as an open source drop in replacement.

## Base Link

- You can use this base link to acess the API:

```shell
http://67in39p3ipfv343uct23raf524.ingress.a100.mon.obl.akash.pub

```
Here are some examples:

#### Generate request (Streaming)

##### Request

```shell
curl http://baseAkashUrl/api/generate -d '{
  "model": "llava-phi3",
  "prompt": "What is quantum mechanics?"
}'
```

##### Response

If `stream` is set to `false`, the response will be a single JSON object:

```json
{
  "model": "llava-phi3",
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