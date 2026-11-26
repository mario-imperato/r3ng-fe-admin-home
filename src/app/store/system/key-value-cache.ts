import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AsyncSubject, take, throwError} from "rxjs";
import * as app_globals from "../../app.globals";

import * as string_helpers from '../../shared/helpers/string.helpers';
import {BidEtPair} from "../commons/bid-et-pair";
import * as store_key_value from "./key-value";
import * as store_key_value_package from "./key-value-package";
import {catchError, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class CacheKVPService {
    http = inject(HttpClient);
    urlSiteInfo= inject(app_globals.BaseHrefDomainSiteIdAndLanguage)
    cache = new Map<string, store_key_value_package.KeyValuePackage>();

    load() {
        const semLogContext = "cache-kv-cache::load"
        const u = string_helpers.format(
            store_key_value.KeyValueEndpointConfig.query,
            this.urlSiteInfo.domain, this.urlSiteInfo.site, this.urlSiteInfo.siteScope, this.urlSiteInfo.language
        );
        const headers = {accept: 'application/json'};
        return this.http.get<store_key_value_package.KeyValuePackage[]>(u, {
            responseType: 'json',
            withCredentials: true,
            headers: headers
        }).pipe(
            tap((res) => {
                if (res && res.length > 0) {
                    for (let p of res) {
                        const cacheKey = JSON.stringify({_bid: p._bid, _et: p._et});
                        this.cache.set(cacheKey, p);
                    }
                }

                console.log(semLogContext + " - cache loaded");
            }),
            take(1),
            catchError((error: HttpErrorResponse) => {
                console.error(semLogContext, error)
                return throwError(() => error);
            })
        )
    }

    get(cacheObject: BidEtPair): store_key_value_package.KeyValuePackage | undefined {
        const cacheKey = JSON.stringify(cacheObject);

        if (this.cache.has(cacheKey)) {
            const bean = this.cache.get(cacheKey);
            return bean
        }

        return undefined
    }

    getPackage(pkgName: string) : store_key_value_package.KeyValuePackage | undefined {
        const cacheKey = JSON.stringify({_bid: pkgName, _et: "kv"});
        if (this.cache.has(cacheKey)) {
            const bean = this.cache.get(cacheKey);
            return bean
        }

        return undefined
    }

    getPropertyInPackage(pkgName: string, propertyName: string): string {
        const cacheKey = JSON.stringify({_bid: pkgName, _et: "kv"});

        if (this.cache.has(cacheKey)) {
            const bean = this.cache.get(cacheKey);
            const p = store_key_value_package.getKeyValuePackageProperty(bean!, propertyName);
            return p
        }

        return ""
    }

}
