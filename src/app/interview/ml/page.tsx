"use client";

import { useState } from "react";
import { GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

const questions = [
  { q: "What is Machine Learning?", a: "ML is a subset of AI where systems learn patterns from data without being explicitly programmed. Instead of writing rules, you provide examples and the algorithm discovers the rules itself." },
  { q: "What are the main types of ML?", a: "Supervised Learning (labeled data — classification/regression), Unsupervised Learning (unlabeled data — clustering/dimensionality reduction), Reinforcement Learning (agent learns from rewards/penalties), Semi-supervised (mix of labeled and unlabeled)." },
  { q: "Explain the bias-variance tradeoff.", a: "High bias = model too simple, underfits (misses patterns). High variance = model too complex, overfits (memorizes noise). The goal is minimum total error — the sweet spot between the two." },
  { q: "What is cross-validation?", a: "K-Fold CV splits data into K parts. Train on K-1 parts, test on the remaining one. Repeat K times. Gives a robust estimate of model performance and helps detect overfitting." },
  { q: "What is the difference between bagging and boosting?", a: "Bagging: train multiple models on random subsets in parallel, average results (Random Forest). Boosting: train models sequentially, each fixing the previous one's errors (XGBoost, AdaBoost). Boosting usually gives better accuracy but can overfit." },
  { q: "What is a Random Forest?", a: "An ensemble of decision trees trained on random subsets of data and features. Each tree votes, majority wins. Reduces overfitting compared to a single decision tree. Handles missing data well." },
  { q: "What is gradient boosting?", a: "An ensemble method that builds trees sequentially. Each new tree tries to correct the errors of the previous ensemble. XGBoost, LightGBM, and CatBoost are popular implementations. Often wins Kaggle competitions." },
  { q: "What is the curse of dimensionality?", a: "As features increase, the data becomes sparse in high-dimensional space. Models need exponentially more data to generalize. Solutions: feature selection, PCA, dimensionality reduction." },
  { q: "What is PCA?", a: "Principal Component Analysis reduces dimensions by finding the directions (components) of maximum variance in the data. Projects data onto fewer dimensions while preserving as much information as possible." },
  { q: "What is the difference between L1 and L2 regularization?", a: "L1 (Lasso): adds absolute value of weights to loss. Drives some weights to exactly zero (feature selection). L2 (Ridge): adds squared weights to loss. Shrinks all weights but doesn't zero them out. Elastic Net combines both." },
  { q: "What is a confusion matrix?", a: "A table showing True Positives, False Positives, True Negatives, False Negatives. From it you calculate: Accuracy, Precision, Recall, F1-Score, Specificity. Essential for evaluating classifiers." },
  { q: "When would you use precision vs recall?", a: "High Precision needed: spam detection (don't want to lose real emails). High Recall needed: cancer detection (don't want to miss any cases). F1 balances both when you need a single metric." },
  { q: "What is a ROC curve?", a: "Plots True Positive Rate vs False Positive Rate at different thresholds. AUC (Area Under Curve) measures overall model quality. AUC=1 is perfect, AUC=0.5 is random guessing." },
  { q: "How do you handle imbalanced datasets?", a: "Oversampling minority class (SMOTE), undersampling majority, class weights, different evaluation metrics (F1, AUC instead of accuracy), ensemble methods, generating synthetic data." },
  { q: "What is feature scaling and why is it important?", a: "Normalizing features to similar ranges. StandardScaler (mean=0, std=1) or MinMaxScaler (0-1). Important for: gradient descent convergence, distance-based algorithms (KNN, SVM), regularization." },
  { q: "What is a decision tree?", a: "A tree-structured model that makes decisions by splitting data on feature values. Each internal node is a question, each branch is an answer, each leaf is a prediction. Easy to interpret but prone to overfitting." },
  { q: "What is SVM?", a: "Support Vector Machine finds the hyperplane that maximally separates classes. The 'support vectors' are the closest points to the boundary. Kernel trick allows non-linear separation. Good for high-dimensional data." },
  { q: "What is KNN?", a: "K-Nearest Neighbors classifies a point based on the majority class of its K closest neighbors. Simple, no training phase, but slow at prediction time for large datasets. Sensitive to feature scaling." },
  { q: "What is Naive Bayes?", a: "A probabilistic classifier based on Bayes' theorem with the 'naive' assumption that features are independent. Fast, works well with text classification (spam detection). Surprisingly effective despite the naive assumption." },
  { q: "What is the difference between parametric and non-parametric models?", a: "Parametric: fixed number of parameters regardless of data size (Linear Regression, Logistic Regression). Non-parametric: complexity grows with data (KNN, Decision Trees, Random Forest). Non-parametric is more flexible but needs more data." },
  { q: "How do you handle missing data?", a: "Remove rows/columns (if few missing), impute with mean/median/mode, use algorithms that handle missing values (XGBoost), create a 'missing' indicator feature, use KNN imputation, or multiple imputation." },
  { q: "What is the difference between generative and discriminative models?", a: "Discriminative: learns the boundary between classes (Logistic Regression, SVM, Neural Networks). Generative: learns the distribution of each class (Naive Bayes, GANs, HMMs). Discriminative usually better for classification." },
  { q: "What is clustering?", a: "Unsupervised grouping of similar data points. K-Means (specify K clusters), DBSCAN (density-based, finds arbitrary shapes), Hierarchical (builds a tree of clusters). Used for customer segmentation, anomaly detection." },
  { q: "What is the elbow method?", a: "A technique to find the optimal number of clusters (K) in K-Means. Plot the within-cluster sum of squares vs K. The 'elbow' point where the curve bends is the optimal K." },
  { q: "What is A/B testing in ML?", a: "Comparing two model versions (A and B) on real users to see which performs better. Randomly split traffic, measure key metrics, use statistical tests to determine if the difference is significant." },
  { q: "What is model deployment?", a: "Taking a trained model from development to production where it serves real predictions. Involves: containerization (Docker), API creation (Flask/FastAPI), monitoring, versioning, handling scale, and detecting model drift." },
  { q: "What is model drift?", a: "When a deployed model's performance degrades over time because the real-world data distribution changes. Types: data drift (input changes), concept drift (relationship between input and output changes). Requires monitoring and retraining." },
  { q: "What is AutoML?", a: "Automated Machine Learning — tools that automate model selection, hyperparameter tuning, and feature engineering. Examples: Google AutoML, H2O, Auto-sklearn. Makes ML accessible to non-experts but experts still needed for complex problems." },
  { q: "What is the No Free Lunch theorem?", a: "No single algorithm works best for every problem. An algorithm that excels on one type of data may fail on another. You must always try multiple approaches and validate on your specific data." },
  { q: "How do you explain a model to non-technical stakeholders?", a: "Use SHAP values or LIME for feature importance. Show concrete examples. Use analogies. Focus on business impact, not math. Visualize predictions vs actuals. Explain confidence levels and limitations honestly." },
];

export default function MLInterviewPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">ML Interview Questions</h1>
          <p className="text-xs text-slate-400">{questions.length} questions · Click to reveal answers</p>
        </div>
      </div>

      <div className="space-y-2">
        {questions.map((item, i) => (
          <div key={i} className="rounded-xl bg-slate-900/80 border border-slate-700/40 overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors">
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
