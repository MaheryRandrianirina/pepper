
import { CheckCircle2Icon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../alert"

export function ActionAlert({message}:{message: string}){
    return <Alert className="bg-green-50 text-green-800 my-8" variant="default">
              <CheckCircle2Icon />
              <AlertTitle>{message}</AlertTitle>
              <AlertDescription>
                Ceci est un message d'alerte pour informer l'utilisateur d'une action de l'administrateur.
              </AlertDescription>
        </Alert>
}