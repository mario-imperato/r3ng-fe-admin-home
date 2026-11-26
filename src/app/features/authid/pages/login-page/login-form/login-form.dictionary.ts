var ApiMessages : Map<number, string> = new Map<number, string>([
    [200, "operazione terminata con successo..."],
    [501, "errore interno di sistema..."],
    // @tpm-schematics:start-region("dictionary-entries")
    [403, "Nome utente o parola chiave non corrispondenti"]
    // @tpm-schematics:end-region("dictionary-entries")
])

export function GetMessageFor(aStatusCode: number) : string {
    if (ApiMessages.has(aStatusCode)) {
        return ApiMessages.get(aStatusCode)!
    }

    return `${aStatusCode} error (please update dictionary)`
}
