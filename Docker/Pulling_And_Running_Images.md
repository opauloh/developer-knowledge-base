## Pulling and Running Images

### Pulling From Docker Hub

We can pull images from the docker hub, i.e: https://hub.docker.com/_/ubuntu

From terminal run:

```bash
docker pull ubuntu
```

This will download the image to your machine

- You can also enter in a docker image to see its contents by running:

```bash
docker run -it gcr.io/cmd-infra/webapp:develop sh
```

# Running

To run the image, use the `docker run` command, in this case for example:

```bash
docker run -i -t ubuntu
```
