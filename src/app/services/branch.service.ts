import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  /**
   * Latest fetced result from HKMA API
   * https://api.hkma.gov.hk/public/bank-svf-info/banks-branch-locator?lang=en
   * 
   * apidocs location:
   * https://apidocs.hkma.gov.hk/documentation/bank-svf-info/banks-branch-locator/
   * 
   * CHANGELOG:
   * 2025-05-06: 1) Detected new column "barrier-free_access_code" in the API response.
   *             2) Currently the dataset is at the amount of 1075 records. 
   *                  offset=0     , limit=1000  => 1000 items
   *                  offset=1000  , limit=1000  => 75 items
   * 
   * Latest API response sample:
   * {
        "district": "YuenLong",
        "bank_name": "Industrial and Commercial Bank of China (Asia) Limited",
        "branch_name": "Yuen Long Branch",
        "address": "G/F, 197-199 Castle Peak Road, Yuen Long, New Territories",
        "service_hours": "Mon-Thu, 09:00 - 17:00;;Fri, 09:00 - 17:30; ;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
        "latitude": "22.44472",
        "longitude": "114.02617",
        "barrier-free_access": "Assisted listening systems available, Wheelchair accessible counters or meeting rooms, Guide dogs welcome",
        "barrier-free_access_code": null
      },
   * Citation reference:
   * Hong Kong Monetary Authority (no date) Information of branches of retail banks – Hong Kong Monetary Authority [online]. Available from: https://apidocs.hkma.gov.hk/documentation/bank-svf-info/banks-branch-locator/.
   */

  private branches: Branch[] = [
    {
      "district": "YuenLong",
      "bank_name": "Industrial and Commercial Bank of China (Asia) Limited",
      "branch_name": "Yuen Long Branch",
      "address": "G/F, 197-199 Castle Peak Road, Yuen Long, New Territories",
      "service_hours": "Mon-Thu, 09:00 - 17:00;;Fri, 09:00 - 17:30; ;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.44472",
      "longitude": "114.02617",
      "barrier-free_access": "Assisted listening systems available, Wheelchair accessible counters or meeting rooms, Guide dogs welcome",
      "barrier-free_access_code": null
    },
    {
      "district": "Central",
      "bank_name": "HSBC Hong Kong",
      "branch_name": "Central Main Branch",
      "address": "1 Queen's Road Central, Hong Kong",
      "service_hours": "Mon-Fri, 09:00 - 16:30;;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.28083",
      "longitude": "114.16083",
      "barrier-free_access": "Wheelchair accessible, Guide dogs welcome",
      "barrier-free_access_code": "A,G"
    },
    {
      "district": "TsuenWan",
      "bank_name": "Bank of China (Hong Kong) Limited",
      "branch_name": "Tsuen Wan Branch",
      "address": "G/F, 167 Castle Peak Road, Tsuen Wan, New Territories",
      "service_hours": "Mon-Fri, 09:00 - 17:00;;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.37194",
      "longitude": "114.11083",
      "barrier-free_access": "Wheelchair accessible, Assisted listening systems",
      "barrier-free_access_code": "A,W"
    },
    {
      "district": "KowloonCity",
      "bank_name": "Standard Chartered Bank (Hong Kong) Limited",
      "branch_name": "Kowloon City Branch",
      "address": "G/F, 86 Nga Tsin Wai Road, Kowloon City, Kowloon",
      "service_hours": "Mon-Fri, 09:30 - 17:00;;Sat, 09:30 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.33056",
      "longitude": "114.18361",
      "barrier-free_access": "Wheelchair accessible",
      "barrier-free_access_code": "W"
    },
    {
      "district": "ShaTin",
      "bank_name": "DBS Bank (Hong Kong) Limited",
      "branch_name": "Sha Tin Branch",
      "address": "Shop 40, Level 1, Shatin Plaza, 21-27 Sha Tin Centre Street, Sha Tin, New Territories",
      "service_hours": "Mon-Fri, 09:00 - 17:00;;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.38139",
      "longitude": "114.18944",
      "barrier-free_access": "Wheelchair accessible, Guide dogs welcome",
      "barrier-free_access_code": "W,G"
    },
    {
      "district": "WanChai",
      "bank_name": "Hang Seng Bank Limited",
      "branch_name": "Wan Chai Branch",
      "address": "G/F, 200 Hennessy Road, Wan Chai, Hong Kong",
      "service_hours": "Mon-Fri, 09:00 - 16:30;;Sat, 09:00 - 12:30;;Closed on Sun and public holiday",
      "latitude": "22.27778",
      "longitude": "114.17278",
      "barrier-free_access": "Wheelchair accessible, Assisted listening systems, Guide dogs welcome",
      "barrier-free_access_code": "W,A,G"
    },
    {
      "district": "MongKok",
      "bank_name": "The Bank of East Asia, Limited",
      "branch_name": "Mong Kok Branch",
      "address": "G/F, 638-640 Nathan Road, Mong Kok, Kowloon",
      "service_hours": "Mon-Fri, 09:00 - 17:00;;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.32111",
      "longitude": "114.16917",
      "barrier-free_access": "Wheelchair accessible",
      "barrier-free_access_code": "W"
    },
    {
      "district": "TaiPo",
      "bank_name": "Citibank (Hong Kong) Limited",
      "branch_name": "Tai Po Branch",
      "address": "G/F, 22-26 Tai Wing Lane, Tai Po Market, New Territories",
      "service_hours": "Mon-Fri, 10:00 - 18:00;;Sat, 10:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.45083",
      "longitude": "114.16694",
      "barrier-free_access": "Guide dogs welcome",
      "barrier-free_access_code": "G"
    },
    {
      "district": "KwunTong",
      "bank_name": "Dah Sing Bank, Limited",
      "branch_name": "Kwun Tong Branch",
      "address": "G/F, Crocodile Center, 79 Hoi Yuen Road, Kwun Tong, Kowloon",
      "service_hours": "Mon-Fri, 09:00 - 17:00;;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.31389",
      "longitude": "114.22444",
      "barrier-free_access": "Wheelchair accessible, Guide dogs welcome",
      "barrier-free_access_code": "W,G"
    },
    {
      "district": "TuenMun",
      "bank_name": "China Construction Bank (Asia) Corporation Limited",
      "branch_name": "Tuen Mun Branch",
      "address": "Shop 16, G/F, Parklane Square, 2 Tuen Hi Road, Tuen Mun, New Territories",
      "service_hours": "Mon-Fri, 09:00 - 17:00;;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.39028",
      "longitude": "113.97944",
      "barrier-free_access": "Wheelchair accessible, Assisted listening systems",
      "barrier-free_access_code": "W,A"
    },
    {
      "district": "SaiKung",
      "bank_name": "Wing Lung Bank Limited",
      "branch_name": "Sai Kung Branch",
      "address": "G/F, 16 Yi Chun Street, Sai Kung, New Territories",
      "service_hours": "Mon-Fri, 09:00 - 17:00;;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.38139",
      "longitude": "114.27194",
      "barrier-free_access": "Wheelchair accessible",
      "barrier-free_access_code": "W"
    },
    {
      "district": "TsimShaTsui",
      "bank_name": "Nanyang Commercial Bank, Limited",
      "branch_name": "Tsim Sha Tsui Branch",
      "address": "G/F, Hankow Centre, 5-15 Hankow Road, Tsim Sha Tsui, Kowloon",
      "service_hours": "Mon-Fri, 09:00 - 17:00;;Sat, 09:00 - 13:00;;Closed on Sun and public holiday",
      "latitude": "22.29722",
      "longitude": "114.17222",
      "barrier-free_access": "Wheelchair accessible, Guide dogs welcome",
      "barrier-free_access_code": "W,G"
    }
  ];

  constructor() { }

  getBranches(): Observable<Branch[]> {
    return of(this.branches);
  }

  getFilteredBranches(
    page: number, 
    pageSize: number, 
    searchTerm: string = ''
  ): Observable<{ branches: Branch[], total: number }> {
    let filteredBranches = this.branches;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredBranches = this.branches.filter(branch => 
        branch.district.toLowerCase().includes(term) ||
        branch.bank_name.toLowerCase().includes(term) ||
        branch.branch_name.toLowerCase().includes(term) ||
        branch.address.toLowerCase().includes(term)
      );
    }
    
    const startIndex = (page - 1) * pageSize;
    const paginatedBranches = filteredBranches.slice(startIndex, startIndex + pageSize);
    
    return of({
      branches: paginatedBranches,
      total: filteredBranches.length
    });
  }
}