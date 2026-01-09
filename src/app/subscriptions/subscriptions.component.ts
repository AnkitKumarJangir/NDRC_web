import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss'
})
export class SubscriptionsComponent {
  plans = [
    {
      name: 'Starter',
      price: '₹599',
      duration: '/ month',
      description: 'Best for small businesses getting started',
      features: [
        'Up to 10 users',
        'Basic analytics',
        'Email support',
        'Standard onboarding'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '₹899',
      duration: '/ 2 months',
      description: 'Most popular choice for growing teams',
      features: [
        'Unlimited users',
        'Advanced analytics',
        'Priority support',
        'GST & PAN reports',
        'Custom branding'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      duration: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Dedicated account manager',
        'Custom integrations',
        '24/7 premium support',
        'Unlimited data'
      ],
      highlighted: false
    }
  ];

  selectPlan(plan: any) {
    console.log('Selected plan:', plan);
    // integrate payment or next onboarding step here
  }
}
