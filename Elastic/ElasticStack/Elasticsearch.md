# Elasticsearch

## Configuration

config can be done in `/etc/elasticsearch/elasticsearch.yml`

- If you config network.host to 0, it will bind to all interfaces. But you also
  have to remember to add the `discovery.type: single-node` line into the config
  yml file
