# SFDX - Hello Nuxeo LWC

Sample Lightning Web Component leveraging [Nuxeo JS client](https://github.com/nuxeo/nuxeo-js-client).

## Setup Scratch Org

1. Install SFDX CLI

```	npm install -g sfdx-cli```

2. Login

```sfdx force:auth:web:login```

3. Create Scratch Org

```sfdx force:org:create -s -f config/project-scratch-def.json```

4. Open the Scratch Org

```sfdx force:org:open```

## Developing

- Install deps

```npm install```

- Watch

```npm run watch```

## Resources

- https://developer.salesforce.com/docs/component-library/documentation/lwc
- https://github.com/trailheadapps/lwc-recipes
