#remote backend configuration
terraform {
    backend "s3" {
        bucket       = "terraform-backend2004"
        key          = "statefile/terraform.tfstate"
        region       = "ap-south-1"
        encrypt      = true
        use_lockfile = true
    }
}


