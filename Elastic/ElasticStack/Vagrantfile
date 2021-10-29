# -*- mode: ruby -*-
# vi: set ft=ruby :
# Vagrantfile for Elasticstack course sandbox
# Set EASY_MODE=true to automate setting up elasticstack for testing

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"

    config.vm.hostname = "elastic"
    config.vm.network "forwarded_port", guest: 9200, host: 9200, host_ip: "127.0.0.1"
    config.vm.network "forwarded_port", guest: 5601, host: 5601, host_ip: "127.0.0.1"

    config.vm.provider "virtualbox" do |vb|
      vb.memory = "4096"
    end
 

    if ENV["EASY_MODE"] then;
      config.vm.provision "shell", inline: <<-EASY_MODE_SCRIPT1
      echo "Easy Mode: Installing Elastic Stack"
      wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
      echo "deb https://artifacts.elastic.co/packages/oss-7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
      EASY_MODE_SCRIPT1
    end

    config.vm.provision "shell", inline: <<-OS_SETUP
    apt-get update
    apt-get install -y unzip
    OS_SETUP

    if ENV["EASY_MODE"] then;
      config.vm.provision "shell", inline: <<-EASY_MODE_SCRIPT2
      apt-get install -y elasticsearch-oss kibana-oss openjdk-11-jre
      apt-get install -y logstash-oss
      echo 'server.host: "0"' >> /etc/kibana/kibana.yml
      systemctl enable elasticsearch kibana logstash
      systemctl start elasticsearch kibana logstash
      EASY_MODE_SCRIPT2
    end
  
    config.vm.provision "file", source: "sandbox.zip", destination: "/tmp/sandbox.zip"
  
    config.vm.provision "shell", inline: <<-WEB_STACK
    unzip /tmp/sandbox.zip -d /var/
    chmod +x /var/sandbox/scripts/*
    cp -a /var/sandbox/scripts/* /usr/local/bin/
    web_test_setup.sh
    WEB_STACK
end
