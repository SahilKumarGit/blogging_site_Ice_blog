import { Router } from "@angular/router";
import { BasicsService } from "src/services/basics/basics.service";

export class ErrorHandel {
    constructor(private router: Router, private basic: BasicsService) { }

    networkError(error: any) {
        try {
            // console.log(error.status)
            if ([401, 403].includes(error.status) || !error.error.login) {
                this.basic.alert(error.error.message)
                return this.router.navigateByUrl('/login')
            }

            return this.basic.alert(error.error.message)
        } catch (e: any) {
            this.basic.alert(e.message)
            return this.router.navigateByUrl('/login')
        }
    }
}
