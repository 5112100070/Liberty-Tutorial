## Create HA for Liberty Server

We will demonstrate a High Availability (HA) setup using 1 VM running NGINX as the load balancer and 3 VMs running Liberty, with the following specifications:
 - Load Balancer VM: 4 cores, 16 GB memory
 - Liberty VMs: 4 cores, 16 GB memory each

![ha-architecture](images/HA-Architecture.drawio.png)

For example load balancer configuration, you can refer to [upstream](Example%20Config/liberty-upstream.conf) and [proxy conf](Example%20Config/liberty-lb.conf)