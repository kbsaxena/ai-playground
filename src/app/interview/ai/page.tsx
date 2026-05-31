"use client";

import { useState } from "react";
import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

const questions = [
  { q: "What is Artificial Intelligence?", a: "AI is the simulation of human intelligence by machines. It enables computers to learn from experience, adjust to new inputs, and perform tasks that typically require human intelligence — like recognizing speech, making decisions, and translating languages." },
  { q: "What is the difference between AI, ML, and Deep Learning?", a: "AI is the broadest concept — machines acting intelligently. ML is a subset of AI where machines learn from data without being explicitly programmed. Deep Learning is a subset of ML that uses neural networks with many layers to learn complex patterns." },
  { q: "What are the types of AI?", a: "Narrow AI (ANI): designed for one task (Siri, chess engines). General AI (AGI): human-level intelligence across all tasks (doesn't exist yet). Super AI (ASI): surpasses human intelligence (theoretical)." },
  { q: "What is the Turing Test?", a: "A test proposed by Alan Turing where a human evaluator interacts with a machine and a human through text. If the evaluator can't reliably tell which is the machine, the machine is said to exhibit intelligent behavior." },
  { q: "What is supervised vs unsupervised learning?", a: "Supervised: model learns from labeled data (input-output pairs). Like a teacher showing correct answers. Unsupervised: model finds patterns in unlabeled data on its own. Like grouping similar items without being told the categories." },
  { q: "What is reinforcement learning?", a: "An agent learns by interacting with an environment, receiving rewards for good actions and penalties for bad ones. Over time, it learns the optimal strategy. Used in game AI (AlphaGo), robotics, and self-driving cars." },
  { q: "What is overfitting and how do you prevent it?", a: "Overfitting is when a model memorizes training data instead of learning general patterns. It performs great on training data but poorly on new data. Prevention: more data, regularization, dropout, early stopping, cross-validation." },
  { q: "What is a neural network?", a: "A computing system inspired by the brain, made of layers of interconnected nodes (neurons). Each connection has a weight. Data flows through layers, getting transformed at each step, until it produces an output (prediction)." },
  { q: "What is backpropagation?", a: "The algorithm used to train neural networks. It calculates how much each weight contributed to the error, then adjusts weights backward from output to input. It's how the network 'learns' from its mistakes." },
  { q: "What is transfer learning?", a: "Using a pre-trained model (trained on a large dataset) as a starting point for a new task. Instead of training from scratch, you fine-tune the existing model. Saves time, data, and compute. Example: using GPT as a base for a chatbot." },
  { q: "What is the bias-variance tradeoff?", a: "Bias: error from oversimplifying (underfitting). Variance: error from being too sensitive to training data (overfitting). The goal is to find the sweet spot — a model complex enough to capture patterns but simple enough to generalize." },
  { q: "What is gradient descent?", a: "An optimization algorithm that finds the minimum of a function by iteratively moving in the direction of steepest descent (negative gradient). Used to minimize the loss function during training. Learning rate controls step size." },
  { q: "What are hyperparameters?", a: "Settings you choose before training (not learned from data): learning rate, batch size, number of layers, epochs, dropout rate. Tuning these significantly affects model performance." },
  { q: "What is regularization?", a: "Techniques to prevent overfitting by adding constraints to the model. L1 (Lasso): pushes weights to zero (feature selection). L2 (Ridge): shrinks weights (prevents any single feature from dominating). Dropout: randomly disables neurons during training." },
  { q: "What is the difference between classification and regression?", a: "Classification: predicting a category (spam/not spam, cat/dog). Regression: predicting a continuous number (house price, temperature). Both are supervised learning tasks." },
  { q: "What is a loss function?", a: "A function that measures how wrong the model's predictions are. The goal of training is to minimize this. Common ones: MSE (regression), Cross-Entropy (classification). Lower loss = better predictions." },
  { q: "What is batch normalization?", a: "A technique that normalizes the inputs to each layer, making training faster and more stable. It reduces internal covariate shift — the problem where layer inputs change as previous layers update." },
  { q: "What is an activation function?", a: "A function applied to a neuron's output to introduce non-linearity. Without it, a neural network would just be a linear function. Common ones: ReLU (most popular), Sigmoid, Tanh, Softmax (for classification output)." },
  { q: "What is data augmentation?", a: "Artificially increasing training data by applying transformations: rotating images, flipping, cropping, adding noise, changing brightness. Helps prevent overfitting and improves generalization, especially with limited data." },
  { q: "What is the difference between precision and recall?", a: "Precision: of all positive predictions, how many were actually positive? (avoid false positives). Recall: of all actual positives, how many did we find? (avoid false negatives). F1 score balances both." },
  { q: "What is cross-validation?", a: "A technique to evaluate model performance by splitting data into K folds. Train on K-1 folds, test on the remaining one. Repeat K times. Gives a more reliable estimate of how the model will perform on unseen data." },
  { q: "What is feature engineering?", a: "The process of creating new input features from raw data to improve model performance. Examples: extracting day-of-week from a date, combining features, normalizing values. Often more impactful than choosing a fancier model." },
  { q: "What is an epoch vs a batch?", a: "Epoch: one complete pass through the entire training dataset. Batch: a subset of data processed before updating weights. Mini-batch gradient descent processes one batch at a time. Multiple batches = one epoch." },
  { q: "What is the vanishing gradient problem?", a: "In deep networks, gradients can become extremely small as they propagate backward through many layers, making early layers learn very slowly. Solutions: ReLU activation, residual connections (skip connections), batch normalization." },
  { q: "What is ensemble learning?", a: "Combining multiple models to get better predictions than any single model. Methods: Bagging (Random Forest — train on different data subsets), Boosting (XGBoost — each model fixes previous errors), Stacking (use a meta-model to combine predictions)." },
];

export default function AIInterviewPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Interview Questions</h1>
          <p className="text-xs text-slate-400">{questions.length} questions · Click to reveal answers</p>
        </div>
      </div>

      <div className="space-y-2">
        {questions.map((item, i) => (
          <div key={i} className="rounded-xl bg-slate-900/80 border border-slate-700/40 overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-sm text-white font-medium pr-4">{item.q}</span>
              {openIdx === i ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
            </button>
            {openIdx === i && (
              <div className="px-4 pb-4 border-t border-slate-800">
                <p className="text-sm text-slate-300 leading-relaxed pt-3">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
