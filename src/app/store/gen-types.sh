#!/bin/sh

## commons

gong-schematics-cli gen types \
      --name SysInfo \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/commons/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name UserRole \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/commons/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name App \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/commons/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name FileVariant \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/commons/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name FileReference \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/commons/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name Address \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/commons/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name BidTextPair \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/commons/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name Note \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/commons/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name Event \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/commons/schema.yml \
      --with-format
## system


gong-schematics-cli gen types \
      --name member \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicore/schema.yml \
      --path-override store/system \
      --with-format

gong-schematics-cli gen types \
      --name domain \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicore/schema.yml \
      --path-override store/system \
      --with-format

gong-schematics-cli gen types \
      --name site \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicore/schema.yml \
      --path-override store/system \
      --with-format

gong-schematics-cli gen types \
      --name user \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicore/schema.yml \
      --path-override store/system \
      --with-format

gong-schematics-cli gen types \
      --name session \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicore/schema.yml \
      --path-override store/system \
      --with-format

gong-schematics-cli gen types \
      --name keyValue \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicore/schema.yml \
      --path-override store/system \
      --with-format

gong-schematics-cli gen types \
      --name keyValuePackage \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicore/schema.yml \
      --path-override store/system \
      --with-format


## cms


gong-schematics-cli gen types \
      --name file \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicms/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name entRefStruct \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicms/schema.yml \
      --with-format

