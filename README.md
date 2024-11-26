# Zerops x Payload CMS

[Payload CMS](https://github.com/payloadcms/payload) is fully open source that can be used both as an app framework and a headless CMS. This recipe showcases how to properly setup and run Payload on Zerops. This recipe was created on the base of the Payload version v3.0.1.

![Payload CMS](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/png/cover-payload.png)

## Deploy on Zerops

You can either click the deploy button to deploy directly on Zerops, or manually copy the [import yaml](https://github.com/zeropsio/recipe-payload/blob/main/zerops-project-import.yml) to the import dialog in the Zerops app.

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/green/deploy-button.svg)](https://app.zerops.io/recipe/payload)

## Recipe features

- Zerops **PostgreSQL 16.2** service as database
- Zerops **Object Storage** (S3 compatible) service as file system
- Logs set up to use **syslog** and accessible through Zerops GUI
- Utilization of Zerops built-in **environment variables** system
- [Mailpit](https://github.com/axllent/mailpit) as **SMTP mock server**

## How to use installed recipe in Zerops GUI

- Wait till the moment the recipe's services are installed and initialized.
- Open the auto-generated subdomain URL available for the `api` service.
- Register the first administration user and log in to the admin client.
- Use installed and running Payload CMS to publish content.
- Open the auto-generated subdomain URL available for the `mailpit` service.
- The `mailpit` SMTP mock server will receive any email sent by the Payload API.
