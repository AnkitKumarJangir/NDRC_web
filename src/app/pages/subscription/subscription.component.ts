import { Component } from '@angular/core';
import { SubscriptionsComponent } from "../../subscriptions/subscriptions.component";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [SubscriptionsComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {

}
