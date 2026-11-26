# gong-schematics-cli: types

## commons
```shell
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
```

## system

```shell
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
```

## cms

```shell
gong-schematics-cli gen types \
      --name file \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicms/schema.yml \
      --with-format

gong-schematics-cli gen types \
      --name entRefStruct \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/apicms/schema.yml \
      --with-format      
```

## territorio

```shell

gong-schematics-cli gen types \
      --name provincia \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/territorio/schema.yml \
      --path-override store/territorio \
      --with-format

gong-schematics-cli gen types \
      --name comune \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/territorio/schema.yml \
      --path-override store/territorio \    
      --with-format                         
```

## Prodotto

```shell
gong-schematics-cli gen types \
      --name prodotto \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/prodotto/schema.yml \
      --path-override store/prodotto      \
      --with-format 
```

## Organizzazione

```shell
gong-schematics-cli gen types \
      --name focalPoint \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/organizzazione/schema.yml \
      --path-override store/organizzazione      \
      --with-format  
```

## Magazzino

```shell
gong-schematics-cli gen types \
      --name magazzino \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/magazzino/schema.yml \
      --path-override store/magazzino  \   
      --with-format  
      
gong-schematics-cli gen types \
      --name Info \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/magazzino/schema.yml \
      --path-override store/magazzino     \
      --with-format        
      
gong-schematics-cli gen types \
      --name Status \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/magazzino/schema.yml \
      --path-override store/magazzino     \ 
      --with-format

gong-schematics-cli gen types \
      --name box \
      --schema /Users/marioa.imperato/projects/opem/opem-store/store/schemas/magazzino/schema.yml \
      --path-override store/magazzino     \ 
      --with-format                              
```
