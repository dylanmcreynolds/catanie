import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { ProposalFilterComponent } from "./proposal-filter.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SharedCatanieModule } from "shared/shared.module";
import { SatDatepickerModule, SatDatepickerRangeValue, SatNativeDateModule } from "saturn-datepicker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { DateTime } from "luxon";

describe("ProposalFilterComponent", () => {
  let component: ProposalFilterComponent;
  let fixture: ComponentFixture<ProposalFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProposalFilterComponent],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        SatDatepickerModule,
        SatNativeDateModule,
        SharedCatanieModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("#doClear()", () => {
    it("should emit an event", () => {
      spyOn(component.clear, "emit");

      component.doClear();

      expect(component.clear.emit).toHaveBeenCalled();
    });
  });

  describe("#doSearchChange()", () => {
    it("should emit an event", () => {
      spyOn(component.searchChange, "emit");

      const query = "test";
      component.doSearchChange(query);

      expect(component.searchChange.emit).toHaveBeenCalledTimes(1);
      expect(component.searchChange.emit).toHaveBeenCalledWith(query);
    });
  });

  describe("#doDateChange()", () => {
    it("should emit an event", () => {
      spyOn(component.dateChange, "emit");

      const event: SatDatepickerRangeValue<DateTime> = {
          begin: DateTime.local(),
          end: DateTime.local()
      };
      component.doDateChange(event);

      expect(component.dateChange.emit).toHaveBeenCalledTimes(1);
      expect(component.dateChange.emit).toHaveBeenCalledWith(event);
    });
  });
});
