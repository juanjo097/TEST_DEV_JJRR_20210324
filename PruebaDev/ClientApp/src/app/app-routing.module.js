"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./components/login/login.component");
var auth_guard_1 = require("./_helpers/auth.guard");
var customers_component_1 = require("./components/modules/customers/customers.component");
var personas_component_1 = require("./components/modules/personas/personas.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'customers', component: customers_component_1.CustomersComponent },
    { path: 'personas', component: personas_component_1.PersonasComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.AppRoutingModule = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app-routing.module.js.map