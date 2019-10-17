import { createReducer, Action, on } from "@ngrx/store";
import {
  SampleState,
  initialSampleState
} from "state-management/state/samples.store";
import * as fromActions from "state-management/actions/samples.actions";

const reducer = createReducer(
  initialSampleState,
  on(fromActions.fetchSamplesAction, state => ({ ...state, isLoading: true })),
  on(fromActions.fetchSamplesCompleteAction, (state, { samples }) => ({
    ...state,
    samples,
    isLoading: false
  })),
  on(fromActions.fetchSamplesFailedAction, state => ({
    ...state,
    isLoading: false
  })),

  on(fromActions.fetchSamplesCountCompleteAction, (state, { count }) => ({
    ...state,
    samplesCount: count,
    isLoading: false
  })),
  on(fromActions.fetchSamplesCountFailedAction, state => ({
    ...state,
    isLoading: false
  })),

  on(fromActions.fetchSampleAction, state => ({ ...state, isLoading: true })),
  on(fromActions.fetchSampleCompleteAction, (state, { sample }) => ({
    ...state,
    currentSample: sample,
    isLoading: false
  })),
  on(fromActions.fetchSampleFailedAction, state => ({
    ...state,
    isLoading: false
  })),

  on(fromActions.fetchSampleDatasetsAction, state => ({
    ...state,
    isLoading: true
  })),
  on(fromActions.fetchSampleDatasetsCompleteAction, (state, { datasets }) => ({
    ...state,
    datasets,
    isLoading: false
  })),
  on(fromActions.fetchSampleDatasetsFailedAction, state => ({
    ...state,
    isLoading: false
  })),

  on(fromActions.fetchSampleDatasetsCountAction, state => ({
    ...state,
    isLoading: true
  })),
  on(
    fromActions.fetchSampleDatasetsCountCompleteAction,
    (state, { count }) => ({ ...state, datasetsCount: count, isLoading: false })
  ),
  on(fromActions.fetchSampleDatasetsCountFailedAction, state => ({
    ...state,
    isLoading: false
  })),

  on(fromActions.addSampleAction, state => ({ ...state, isLoading: true })),
  on(fromActions.addSampleCompleteAction, (state, { sample }) => {
    const samples = state.samples;
    samples.push(sample);
    return { ...state, samples, isLoading: false };
  }),
  on(fromActions.addSampleFailedAction, state => ({
    ...state,
    isLoading: false
  })),

  on(fromActions.addAttachmentAction, state => ({ ...state, isLoading: true })),
  on(fromActions.addAttachmentCompleteAction, (state, { attachment }) => {
    const attachments = state.currentSample.attachments;
    attachments.push(attachment);
    return {
      ...state,
      currentSample: { ...state.currentSample, attachments },
      isLoading: false
    };
  }),
  on(fromActions.addAttachmentFailedAction, state => ({
    ...state,
    isLoading: false
  })),

  on(fromActions.updateAttachmentCaptionAction, state => ({
    ...state,
    isLoading: true
  })),
  on(
    fromActions.updateAttachmentCaptionCompleteAction,
    (state, { attachment }) => {
      const attachments = state.currentSample.attachments.filter(
        existingAttachment => existingAttachment.id !== attachment.id
      );
      attachments.push(attachment);
      return {
        ...state,
        currentSample: { ...state.currentSample, attachments },
        isLoading: false
      };
    }
  ),
  on(fromActions.updateAttachmentCaptionFailedAction, state => ({
    ...state,
    isLoading: false
  })),

  on(fromActions.removeAttachmentAction, state => ({
    ...state,
    isLoading: true
  })),
  on(fromActions.removeAttachmentCompleteAction, (state, { attachmentId }) => {
    const attachments = state.currentSample.attachments.filter(
      attachment => attachment.id !== attachmentId
    );
    return {
      ...state,
      currentSample: { ...state.currentSample, attachments },
      isLoading: false
    };
  }),
  on(fromActions.removeAttachmentFailedAction, state => ({
    ...state,
    isLoading: false
  })),

  on(fromActions.changePageAction, (state, { page, limit }) => {
    const skip = page * limit;
    const samplefilters = { ...state.samplefilters, skip, limit };
    return { ...state, samplefilters };
  }),

  on(fromActions.changeDatasetsPageAction, (state, { page, limit }) => {
    const skip = page * limit;
    const datasetFilters = { ...state.datasetFilters, skip, limit };
    return { ...state, datasetFilters };
  }),

  on(fromActions.sortByColumnAction, (state, { column, direction }) => {
    const sortField = column + (direction ? ":" + direction : "");
    const samplefilters = { ...state.samplefilters, sortField, skip: 0 };
    return { ...state, samplefilters };
  }),

  on(fromActions.setTextFilterAction, (state, { text }) => ({
    ...state,
    samplefilters: { ...state.samplefilters, text }
  }))
);

export function samplesReducer(state: SampleState | undefined, action: Action) {
  if (action.type.indexOf("[Sample]") !== -1) {
    console.log("Action came in! " + action.type);
  }
  return reducer(state, action);
}
