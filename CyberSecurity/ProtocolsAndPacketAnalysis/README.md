## Protocols

![](img/README-20221122115719.png)

![](img/README-20221116163224.png)

![](img/README-20221116163250.png)

![](img/README-20221117095217.png)

Different layers of the OSI model are combined on the TCP / IP model

![](img/README-20221117101222.png)

## TCP

TCP IP - Application: The browser does the compression, and the encryption

![](img/README-20221117101401.png)

### IP

![](img/README-20221117101607.png)

IP v4 vs v6

![](img/README-20221117102123.png)

![](img/README-20221117155241.png)

TTL - Time to Live: Created to prevent infinite loops in a miss-configured router redirecting a package
infinitely and end up creating infinite loops

packet - TTL 10

router a - TTL 9 router b - TTL 8 router c - TTL 7

destination

![](img/README-20221121151225.png)

![](img/README-20221121151346.png)

ip vs 4 and 6 have different names, but the same fields

hop limit = time to live

### ICMP

![](img/README-20221121152719.png)

### TCP Uses

![](img/README-20221122114545.png)

![](img/README-20221122114726.png)

closing connection (ACK)

![](img/README-20221122114807.png)

## UDP

User Datagram Protocol

![](img/README-20221122114953.png)

no handshake

![](img/README-20221122115024.png)

used for voip, streaming

![](img/README-20221122115403.png)

## Sniffing

Intercept or analyze packets

![](img/README-20221122115539.png)

### tcpdump

![](img/README-20221122115641.png)

- tcpdump -i lo

listen for network activity, loopback (the local network)

![](img/README-20221122120011.png)

- tcpdump -i lo -n

no name lookup, this is better because the host name can be changed, and as analyst is better to have the raw
information

![](img/README-20221122120150.png)

- tcpdump -i lo -nX

shows the raw packet

![](img/README-20221122120235.png)

![](img/README-20221122120601.png)
