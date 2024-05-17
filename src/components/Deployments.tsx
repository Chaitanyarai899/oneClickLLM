// services:
//   llm-deployment:
//     image: vector450/deploy:latest
//     container_name: llm-deployment
//     ports:
//       - 11436:11434
//     restart: unless-stopped
//     privileged: true

//   client:
//     image: vector450/client:latest
//     container_name: client
//     environment:
//       - "MODEL=${name}"
//     ports:
//       - 8080:8080
//     restart: no

import { CopyBlock, nord } from "react-code-blocks";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "./dilog";

const Deployments = () => {
  const data = [
    {
      title: "Llama 3",
      description:
        "The most capable openly available LLM to date. Meta Llama 3, a family of models developed by Meta Inc. are new state-of-the-art, available in both 8B and 70B parameter sizes (pre-trained or instruction-tuned).",
      codeName: "llama3",
    },
    {
      title: "Mistral 7B",
      description:
        "The Mistral-7B-v0.1 Large Language Model (LLM) is a pretrained generative text model with 7 billion parameters. Mistral-7B-v0.1 outperforms Llama 2 13B on all benchmarks. The 7B model is capable of generating coherent and contextually relevant text.",
      codeName: "mistral:7b",
    },
    {
      title: "Phi-3",
      description:
        "Phi-3 models are the most capable and cost-effective small language models (SLMs) available, outperforming models of the same size and next size up across a variety of language, reasoning, coding, and math benchmarks.",
      codeName: "phi3",
    },
    {
      title: "DolphinCoder",
      description:
        "A 7B and 15B uncensored variant of the Dolphin model family that excels at coding, based on StarCoder2.",
      codeName: "dolphincoder",
    },
    {
      title: "Orca 2",
      description:
        "Orca 2 is built by Microsoft Research, and is a fine-tuned version of Meta's Llama 2 models. The model is designed to excel particularly in reasoning.",
      codeName: "orca2",
    },
    {
      title: "Nous Hermes",
      description:
        "General use models based on Llama and Llama 2 from Nous Research.",
      codeName: "nous-hermes",
    },
    {
      title: "Stable LM 2",
      description:
        "Stable LM 2 is a state-of-the-art 1.6B and 12B parameter language model trained on multilingual data in English, Spanish, German, Italian, French, Portuguese, and Dutch.",
      codeName: "stablelm2",
    },
    {
      title: "SQLCoder",
      description:
        "SQLCoder is a code completion model fine-tuned on StarCoder for SQL generation tasks.",
      codeName: "sqlcoder",
    },
    {
      title: "Dolphin-Phi",
      description:
        "2.7B uncensored Dolphin model by Eric Hartford, based on the Phi language model by Microsoft Research.",
      codeName: "dolphin-phi",
    },
    {
      title: "Solar",
      description:
        "A compact, yet powerful 10.7B large language model designed for single-turn conversation.",
      codeName: "solar",
    },
    {
      title: "DeepSeek-LLM",
      description:
        "An advanced language model crafted with 2 trillion bilingual tokens.",
      codeName: "deepseek-llm",
    },
    {
      title: "Yarn-Llama2",
      description:
        "An extension of Llama 2 that supports a context of up to 128k tokens.",
      codeName: "yarn-llama2",
    },
    {
      title: "CodeQwen",
      description:
        "CodeQwen1.5 is a large language model pretrained on a large amount of code data.",
      codeName: "codeqwen",
    },
    {
      title: "BakLLaVA",
      description:
        "BakLLaVA is a multimodal model consisting of the Mistral 7B base model augmented with the LLaVA architecture.",
      codeName: "bakllava",
    },
    {
      title: "Samantha-Mistral",
      description:
        "A companion assistant trained in philosophy, psychology, and personal relationships. Based on Mistral.",
      codeName: "samantha-mistral",
    },
    {
      title: "All-MiniLM",
      description: "Embedding models on very large sentence level datasets.",
      codeName: "all-minilm",
    },
    {
      title: "MedLlama2",
      description:
        "Fine-tuned Llama 2 model to answer medical questions based on an open source medical dataset.",
      codeName: "medllama2",
    },
    {
      title: "Llama3-Gradient",
      description:
        "This model extends LLama-3 8B's context length from 8k to over 1m tokens.",
      codeName: "llama3-gradient",
    },
    {
      title: "WizardLM-Uncensored",
      description: "Uncensored version of Wizard LM model.",
      codeName: "wizardlm-uncensored",
    },
    {
      title: "Nous Hermes 2-Mixtral",
      description:
        "The Nous Hermes 2 model from Nous Research, now trained over Mixtral.",
      codeName: "nous-hermes2-mixtral",
    },
    {
      title: "XwinLM",
      description:
        "Conversational model based on Llama 2 that performs competitively on various benchmarks.",
      codeName: "xwinlm",
    },
    {
      title: "Stable-Beluga",
      description:
        "Llama 2 based model fine tuned on an Orca-style dataset. Originally called Free Willy.",
      codeName: "stable-beluga",
    },
    {
      title: "WizardLM",
      description: "General use model based on Llama 2.",
      codeName: "wizardlm",
    },
    {
      title: "CodeUp",
      description: "Great code generation model based on Llama2.",
      codeName: "codeup",
    },
    {
      title: "Yarn-Mistral",
      description:
        "An extension of Mistral to support context windows of 64K or 128K.",
      codeName: "yarn-mistral",
    },
    {
      title: "EverythingLM",
      description:
        "Uncensored Llama2 based model with support for a 16K context window.",
      codeName: "everythinglm",
    },
    {
      title: "Meditron",
      description:
        "Open-source medical large language model adapted from Llama 2 to the medical domain.",
      codeName: "meditron",
    },
    {
      title: "Llama Pro",
      description:
        "An expansion of Llama 2 that specializes in integrating both general language understanding and domain-specific knowledge, particularly in programming and mathematics.",
      codeName: "llama-pro",
    },
    {
      title: "Magicoder",
      description:
        "Magicoder is a family of 7B parameter models trained on 75K synthetic instruction data using OSS-Instruct, a novel approach to enlightening LLMs with open-source code snippets.",
      codeName: "magicoder",
    },
    {
      title: "StableLM-Zephyr",
      description:
        "A lightweight chat model allowing accurate, and responsive output without requiring high-end hardware.",
      codeName: "stablelm-zephyr",
    },
    {
      title: "Nexus Raven",
      description:
        "Nexus Raven is a 13B instruction tuned model for function calling tasks.",
      codeName: "nexusraven",
    },
    {
      title: "CodeBooga",
      description:
        "A high-performing code instruct model created by merging two existing code models.",
      codeName: "codebooga",
    },
    {
      title: "MistralLite",
      description:
        "MistralLite is a fine-tuned model based on Mistral with enhanced capabilities of processing long contexts.",
      codeName: "mistrallite",
    },
    {
      title: "Wizard-Vicuna",
      description:
        "Wizard Vicuna is a 13B parameter model based on Llama 2 trained by MelodysDreamj.",
      codeName: "wizard-vicuna",
    },
    {
      title: "Llama3-ChatQA",
      description:
        "A model from NVIDIA based on Llama 3 that excels at conversational question answering (QA) and retrieval-augmented generation (RAG).",
      codeName: "llama3-chatqa",
    },
    {
      title: "Snowflake-Arctic-Embed",
      description:
        "A suite of text embedding models by Snowflake, optimized for performance.",
      codeName: "snowflake-arctic-embed",
    },
    {
      title: "Goliath",
      description:
        "A language model created by combining two fine-tuned Llama 2 70B models into one.",
      codeName: "goliath",
    },
    {
      title: "Open-Orca-Platypus2",
      description:
        "Merge of the Open Orca OpenChat model and the Garage-bAInd Platypus 2 model. Designed for chat and code generation.",
      codeName: "open-orca-platypus2",
    },
    {
      title: "LLaVA-Llama3",
      description:
        "A LLaVA model fine-tuned from Llama 3 Instruct with better scores in several benchmarks.",
      codeName: "llava-llama3",
    },
    {
      title: "MoonDream",
      description:
        "moondream2 is a small vision language model designed to run efficiently on edge devices.",
      codeName: "moondream",
    },
    {
      title: "Notux",
      description:
        "A top-performing mixture of experts model, fine-tuned with high-quality data.",
      codeName: "notux",
    },
    {
      title: "MegaDolphin",
      description:
        "MegaDolphin-2.2-120b is a transformation of Dolphin-2.2-70b created by interleaving the model with itself.",
      codeName: "megadolphin",
    },
    {
      title: "DuckDB-NSQL",
      description:
        "7B parameter text-to-SQL model made by MotherDuck and Numbers Station.",
      codeName: "duckdb-nsql",
    },
    {
      title: "Notus",
      description:
        "A 7B chat model fine-tuned with high-quality data and based on Zephyr.",
      codeName: "notus",
    },
    {
      title: "Alfred",
      description:
        "A robust conversational model designed to be used for both chat and instruct use cases.",
      codeName: "alfred",
    },
    {
      title: "LLaVA-Phi3",
      description: "A new small LLaVA model fine-tuned from Phi 3 Mini.",
      codeName: "llava-phi3",
    },
    {
      title: "Falcon2",
      description:
        "Falcon2 is an 11B parameters causal decoder-only model built by TII and trained over 5T tokens.",
      codeName: "falcon2",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 ">
      {data?.map((item, index) => {
        const code = `---
        version: "2.0"
        services:
          service-1:
            image: "vector450/deploy:latest"
            expose:
              - port: 11434
                as: 80
                to:
                  - global: true
            env:
              - "Model=${item.codeName}"
        profiles:
          compute:
            service-1:
              resources:
                cpu:
                  units: 29
                memory:
                  size: 61GB
                storage:
                  - size: 33GB
          placement:
            dcloud:
              pricing:
                service-1:
                  denom: uakt
                  amount: 1000
        deployment:
          service-1:
            dcloud:
              profile: service-1
              count: 1
        `;

        return (
          <div
            key={index}
            className={cn(
              "bg-zinc-100 dark:bg-zinc-900 p-8 rounded-2xl shadow-xl h-full mt-4"
            )}
          >
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 my-4">
              {item.description}
            </p>
            <Dialog>
              <DialogTrigger className="bg-[#4f46e5] rounded-lg">
                <button className="inline-block cursor-pointer bg-[#4f46e5] hover:bg-opacity-90 text-white text-lg font-bold py-2 px-4 rounded">
                  Deploy
                </button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 p-0 overflow-y-scroll max-h-[90dvh]  dark:bg-gray-900 border-gray-800">
                <CopyBlock text={code} language="yaml" theme={nord} />
              </DialogContent>
            </Dialog>
          </div>
        );
      })}
    </div>
  );
};

export default Deployments;
