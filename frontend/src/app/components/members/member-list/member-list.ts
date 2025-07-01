import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Borrower } from '../../../models/borrower.model';

@Component({
  selector: 'app-member-list',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './member-list.html',
  styleUrl: './member-list.scss'
})
export class MemberListComponent implements OnInit {
  members: Borrower[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.isLoading = true;
    this.error = null;
    
    this.apiService.getBorrowers().subscribe({
      next: (members) => {
        this.members = members;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading members:', error);
        this.error = 'Failed to load members. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onAddMember(): void {
    // Navigate to add member form
    this.router.navigate(['/borrowers/add']);
  }

  onEditMember(member: Borrower): void {
    // Navigate to edit member form
    this.router.navigate(['/borrowers/edit', member._id]);
  }

  onDeleteMember(member: Borrower): void {
    if (member._id && confirm(`Are you sure you want to delete "${member.name}"?`)) {
      this.apiService.deleteBorrower(member._id).subscribe({
        next: () => {
          this.loadMembers(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting member:', error);
          alert('Failed to delete member. Please try again.');
        }
      });
    }
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
