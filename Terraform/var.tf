variable "argocd_namespace" {
  description = "Namespace to install ArgoCD"
  type        = string
  default     = "argocd"
}

variable "argocd_chart_version" {
  description = "ArgoCD Helm chart version"
  type        = string
  default     = "10.9.6"
}