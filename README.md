# Zerops x Payload CMS

[Payload CMS](https://github.com/payloadcms/payload) is fully open source and can be used both as an app framework and a headless CMS. This recipe showcases how to set up and run Payload on Zerops properly. It was created using the [create-payload-app](https://www.npmjs.com/package/create-payload-app) CLI, based on Payload version v3.0.1 and its [website](https://github.com/payloadcms/payload/tree/main/templates/website) template.

![Payload CMS](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/png/cover-payload.png)

## Deploy on Zerops

You can either click the deploy button to deploy directly on Zerops, or manually copy the [import yaml](https://github.com/zeropsio/recipe-payload/blob/main/zerops-project-import.yml) to the import dialog in the Zerops app.

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/green/deploy-button.svg)](https://app.zerops.io/recipe/payload)

## Recipe features

- Zerops **PostgreSQL 16.2** service as database
- Zerops **Object Storage** (S3 compatible) service as file system using a private bucket
- Logs set up to use **syslog** and accessible through Zerops GUI
- Utilization of Zerops built-in **environment variables** system
- [Mailpit](https://github.com/axllent/mailpit) as **SMTP mock server**

## How to use installed recipe in Zerops GUI

- Wait till the moment the recipe's services are installed and initialized.
- Open the auto-generated subdomain URL available for the `api` service.
- **Visit the admin dashboard** through the offered link on the shown page.
- Register the first administration user and log in to the admin client.
- Click the **Seed your database** link to fill out some content.
- Using the admin dashboard, you can publish your custom content.
- Open the auto-generated subdomain URL available for the `mailpit` service.
- The `mailpit` SMTP mock server will receive any email sent by the Payload API.

## Production vs. development mode

The difference may come down to:

- Use the highly available version of the PostgreSQL database (change `mode` from `NON_HA` to `HA` in recipe YAML, `db` service section) in which case [Patroni cluster](https://patroni.readthedocs.io) is created.
- Think about some caching mechanism (such as Zerops KeyDB or Valkey service, CDN) instead of the database HA mode because of the static character of the Payload pages.
- Try running Payload CMS on multiple runtime containers in high availability (change `maxContainers` from `1` to `2` or more in recipe YAML, `api` service section).
- Use a production-ready third-party SMTP server instead of Mailpit.

Need help setting your project up? Join [Zerops Discord community](https://discord.com/invite/WDvCZ54).
