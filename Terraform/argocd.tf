resource "helm_release" "argocd" {
  name             = "argocd"
  namespace        = var.argocd_namespace
  create_namespace = true

  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = var.argocd_chart_version

  # ArgoCD configuration values
  values = [
    yamlencode({
      # Server configuration
      server = {
        service = {
          type = "ClusterIP"
        }
        ingress = {
          enabled = false  # We'll use port-forward for access
        }
        # Enable insecure mode for easier local access
        extraArgs = [
          "--insecure"
        ]
      }
      
      # Controller configuration
      controller = {
        resources = {
          requests = {
            cpu    = "100m"
            memory = "128Mi"
          }
          limits = {
            cpu    = "500m"
            memory = "512Mi"
          }
        }
      }
      
      # Repo server configuration
      repoServer = {
        resources = {
          requests = {
            cpu    = "50m"
            memory = "64Mi"
          }
          limits = {
            cpu    = "200m"
            memory = "256Mi"
          }
        }
      }
      
      # Redis configuration
      redis = {
        resources = {
          requests = {
            cpu    = "50m"
            memory = "64Mi"
          }
          limits = {
            cpu    = "200m"
            memory = "128Mi"
          }
        }
      }
    })
  ]

}

resource "kubectl_manifest" "argocd_projects" {
  for_each   = fileset("${path.module}/../argocd/projects", "*.yaml")
  yaml_body  = file("${path.module}/../argocd/projects/${each.value}")
  depends_on = [helm_release.argocd]
}

resource "kubectl_manifest" "argocd_apps" {
  for_each   = fileset("${path.module}/../argocd/applications", "*.yaml")
  yaml_body  = file("${path.module}/../argocd/applications/${each.value}")
  depends_on = [kubectl_manifest.argocd_projects]
}