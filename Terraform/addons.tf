module "eks_blueprints_addons" {
  source = "aws-ia/eks-blueprints-addons/aws"
  version = "~> 1.0" #ensure to update this to the latest/desired version

  cluster_name      = module.eks.cluster_name
  cluster_endpoint  = module.eks.cluster_endpoint
  cluster_version   = module.eks.cluster_version
  oidc_provider_arn = module.eks.oidc_provider_arn

  # eks_addons = {
  #   aws-ebs-csi-driver = {
  #     most_recent = true
  #   }
  #   coredns = {
  #     most_recent = true
  #   }
  #   vpc-cni = {
  #     most_recent = true
  #   }
  #   kube-proxy = {
  #     most_recent = true
  #   }
  # }

  eks_addons = {
  coredns = {
    most_recent = true
  }

  vpc-cni = {
    most_recent = true
  }

  kube-proxy = {
    most_recent = true
  }
}

#   enable_aws_load_balancer_controller    = true
#   enable_cluster_proportional_autoscaler = true
#   enable_karpenter                       = true
  enable_kube_prometheus_stack           = true
  enable_metrics_server                  = true
#   enable_external_dns                    = true
  enable_cert_manager                    = true
  
  enable_ingress_nginx                   = true
  ingress_nginx = {
    most_recent = true
    namespace   = "ingress-nginx"
    
    # Basic configuration
    set = [
      {
        name  = "controller.service.type"
        value = "LoadBalancer"
      },
      {
        name  = "controller.service.externalTrafficPolicy"
        value = "Local"
      },
      {
        name  = "controller.resources.requests.cpu"
        value = "100m"
      },
      {
        name  = "controller.resources.requests.memory"
        value = "128Mi"
      },
      {
        name  = "controller.resources.limits.cpu"
        value = "200m"
      },
      {
        name  = "controller.resources.limits.memory"
        value = "256Mi"
      }
    ]
    
    # AWS Load Balancer specific annotations
    set_sensitive = [
      {
        name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-scheme"
        value = "internet-facing"
      },
      {
        name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-type"
        value = "nlb"
      },
      {
        name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-nlb-target-type"
        value = "instance"
      },
      {
        name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-health-check-path"
        value = "/healthz"
      },
      {
        name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-health-check-port"
        value = "10254"
      },
      {
        name  = "controller.service.annotations.service\\.beta\\.kubernetes\\.io/aws-load-balancer-health-check-protocol"
        value = "HTTP"
      }
    ]
  }

  tags = {
    Environment = "dev"
  }

  depends_on = [module.eks]
}
