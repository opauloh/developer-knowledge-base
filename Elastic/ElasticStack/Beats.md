# Beats

![](screenshots/screenshot-20211014173946.png)

beats are lightweight data shipping tools created to solve very specific
problems

![](screenshots/screenshot-20211014174033.png)

## Filebeats

### Installing

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key
add - echo "deb https://artifacts.elastic.co/packages/oss-7.x/apt stable main" |
sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list apt-get update apt-get
install filebeat
```

- fields are located in `/etc/filebeats/fields.yml`, these are ECS fields the
  common sets of fields for ingesting data

- the whole reference configuration can be seem in
  `/etc/filebeats/filebeat.reference.yml`

- config can be done in `/etc/filebeats/filebeat.yml`

- and can enable/disable modules by renaming it in `/etc/filebeat/modules.d`
  (rename `nginx.yml.disabled` to `nginx.yml`)

## Metricbeats

config in `/etc/metricbeat/metricbeat.yml`
