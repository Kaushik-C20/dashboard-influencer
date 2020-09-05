import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Inject, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { InfService } from '../services/inf.service';
import { InfModel } from './inf.model';
import { Subscription, Observable } from 'rxjs';
import { MatPaginator, PageEvent, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith, filter } from 'rxjs/operators';
import { SubjectsService } from '../services/subjects.service';
import { data } from 'jquery';

@Component({
  selector: 'app-influencer-search',
  templateUrl: './influencer-search.component.html',
  styleUrls: ['./influencer-search.component.scss']
})
export class InfluencerSearchComponent implements OnInit, OnDestroy {
  interests: string[] = [
    'Art',
    'Sports',
    'Dance',
    'Music',
    'DIY',
    'Cosmetics',
    'Skin Care',
    'Hair Care',
    'Traditional',
    'Western',
    'Accessories',
    'Shoes',
    'Body Builder',
    'Nutritionist',
    'wellness',
    'Educational',
    'Interior Designer',
    'Architect',
    'Phones',
    'Laptops',
    'Audio Equipments',
    'Fintech',
    'Mutual Funds',
    'Cryptocurrency',
    'Stock Market',
    'Business Coach',
    'Interviews',
    'Celebrity News',
    'National News',
    'Pranks',
    'Slam Poetry',
    'Serials',
    'Story Teller',
    'Daily Vlogger',
    'Homemaker',
    'RJ',
    'Hockey',
    'Cricket',
    'Footballer',
    'Wrestler',
    'Boxing',
    'TT player',
    'Badminton',
    'Food',
    'Swimming',
    'Street Food Reviewer',
    'Chef',
    'Cooking',
    'Bagpacker',
    'Bikes',
    'Cars',
    'Local Traveller',
    'International Traveller',
    'Wildlife Photography',
    'Event Based Photography',
    'Product Photography',
    'Lifestyle Photography',
    'Fashion Photography',
    'Equipment Advisor',
    'Entrepreneurs',
    'Working Professional',
    'Teaching',
    'Beauty'
  ];
  inf_interests: string[] = [];
  value: string = '';
  isLoading = false;
  filList: Observable<string[]>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  subs: Subscription;
  obs: Observable<any>;
  infList: InfModel[];
  searchCtrl = new FormControl();
  dataSource: MatTableDataSource<InfModel>;
  constructor(
    private infServ: InfService,
    private changeDetRef: ChangeDetectorRef,
    private router: Router,
    private subjectServ: SubjectsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.filList = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );

    this.infServ.fetchInfs().subscribe(infs => {
      this.infList = infs;
      console.log(this.infList);
      this.isLoading = false;
      for (let inf of infs) {
        for (let int in inf.interests) {
          this.inf_interests.push(int);
        }
      }
    }, err => {
      alert("Error Occurred! Please try Later");
      this.router.navigateByUrl('/home');
    });
    // this.isLoading=true;
    this.subs = this.infServ.infList.subscribe(infs => {
      this.infList = infs;
      this.dataSource = new MatTableDataSource<InfModel>(infs);
      this.changeDetRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.dataSource.filterPredicate = (data: InfModel, filter: string):boolean => {
        function x(){
          for(let int in data.interests){
            if (int.trim().toLowerCase().split(' ').join('').slice(0,filter.length)==filter){
              return true;
            }
          }
        }
        return !filter || x()
      }
    });
    
  }

  checkLogin() {
    if (this.subjectServ.loggedIn) {
      return true;
    } else {
      alert('Please Login to See more Influencers !');
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  filter(value: string) {
    if (!value) {
      return this.interests.sort();
    }
    return this.interests.sort().filter(interest => interest.trim().toLowerCase().split(' ').join('').slice(0, value.trim().toLowerCase().split(' ').join('').length) == value.trim().toLowerCase().split(' ').join(''));
  }

  applyFilter(value: string) {
    value = value.trim();
    value = value.toLowerCase();
    value = value.split(' ').join('');
    this.dataSource.filter = value;
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

}
