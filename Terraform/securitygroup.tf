resource "aws_security_group_rule" "internet_to_lb_http" {
    type              = "ingress"
    from_port         = 80
    to_port           = 80
    protocol          = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "internet_to_lb_https" {
    type              = "ingress"
    from_port         = 443
    to_port           = 443
    protocol          = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    security_group_id = module.eks.cluster_security_group_id
}


resource "aws_security_group_rule" "health_checks_to_lb" {
    type              = "ingress"
    from_port         = 10254
    to_port           = 10254
    protocol          = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "nodeport_access" {
    type              = "ingress"
    from_port         = 30000
    to_port           = 32767
    protocol          = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    security_group_id = module.eks.cluster_security_group_id
}