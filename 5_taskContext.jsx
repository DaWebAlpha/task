import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const EntityContext = createContext(null);

const CREATE_ENTITY = "CREATE_ENTITY";
const READ_ENTITY = "READ_ENTITY";
const UPDATE_ENTITY = "UPDATE_ENTITY";
const PATCH_ENTITY = "PATCH_ENTITY";
const DELETE_ENTITY = "DELETE_ENTITY";
const SOFT_DELETE_ENTITY = "SOFT_DELETE_ENTITY";
const RESTORE_ENTITY = "RESTORE_ENTITY";
const DUPLICATE_ENTITY = "DUPLICATE_ENTITY";
const MERGE_ENTITY = "MERGE_ENTITY";
const ARCHIVE_ENTITY = "ARCHIVE_ENTITY";
const UNARCHIVE_ENTITY = "UNARCHIVE_ENTITY";

function entityReducer(state, action){
  switch(action.type){
    case CREATE_ENTITY:
      return [action.payload, ...state];
    case READ_ENTITY:
      return state.map(entity => 
        entity.id === action.payload 
          ? { ...entity, lastReadAt: Date.now() } 
          : entity
      );
    case UPDATE_ENTITY:
      return state.map(entity => 
        entity.id === action.payload.id 
          ? { ...entity, ...action.payload.data, updatedAt: Date.now() } 
          : entity
      );
    case PATCH_ENTITY:
      return state.map(entity => 
        entity.id === action.payload.id 
          ? { ...entity, ...action.payload.data, updatedAt: Date.now() } 
          : entity
      );
    case DELETE_ENTITY:
      return state.filter(entity => entity.id !== action.payload);
    case SOFT_DELETE_ENTITY:
      return state.map(entity => 
        entity.id === action.payload 
          ? { ...entity, deletedAt: Date.now(), isDeleted: true } 
          : entity
      );
    case RESTORE_ENTITY:
      return state.map(entity => 
        entity.id === action.payload 
          ? { ...entity, deletedAt: null, isDeleted: false } 
          : entity
      );
    case DUPLICATE_ENTITY:
      return [...state, { ...action.payload, id: crypto.randomUUID(), createdAt: Date.now() }];
    case MERGE_ENTITY:
      return state.map(entity => 
        entity.id === action.payload.targetId 
          ? { ...entity, ...action.payload.data, mergedFrom: action.payload.sourceId, updatedAt: Date.now() }
          : entity
      ).filter(entity => entity.id !== action.payload.sourceId);
    case ARCHIVE_ENTITY:
      return state.map(entity => 
        entity.id === action.payload 
          ? { ...entity, archivedAt: Date.now(), isArchived: true } 
          : entity
      );
    case UNARCHIVE_ENTITY:
      return state.map(entity => 
        entity.id === action.payload 
          ? { ...entity, archivedAt: null, isArchived: false } 
          : entity
      );
    default:
      return state;
  }
}

function EntityProvider({ children }){
  const [entities, dispatch] = useReducer(entityReducer, []);

  const createEntity = useCallback((entityData) => {
    dispatch({ type: CREATE_ENTITY, payload: { ...entityData, id: crypto.randomUUID(), createdAt: Date.now() } });
  }, []);

  const readEntity = useCallback((id) => {
    dispatch({ type: READ_ENTITY, payload: id });
  }, []);

  const updateEntity = useCallback((id, data) => {
    dispatch({ type: UPDATE_ENTITY, payload: { id, data } });
  }, []);

  const patchEntity = useCallback((id, data) => {
    dispatch({ type: PATCH_ENTITY, payload: { id, data } });
  }, []);

  const deleteEntity = useCallback((id) => {
    dispatch({ type: DELETE_ENTITY, payload: id });
  }, []);

  const softDeleteEntity = useCallback((id) => {
    dispatch({ type: SOFT_DELETE_ENTITY, payload: id });
  }, []);

  const restoreEntity = useCallback((id) => {
    dispatch({ type: RESTORE_ENTITY, payload: id });
  }, []);

  const duplicateEntity = useCallback((entity) => {
    dispatch({ type: DUPLICATE_ENTITY, payload: entity });
  }, []);

  const mergeEntity = useCallback((sourceId, targetId, data) => {
    dispatch({ type: MERGE_ENTITY, payload: { sourceId, targetId, data } });
  }, []);

  const archiveEntity = useCallback((id) => {
    dispatch({ type: ARCHIVE_ENTITY, payload: id });
  }, []);

  const unarchiveEntity = useCallback((id) => {
    dispatch({ type: UNARCHIVE_ENTITY, payload: id });
  }, []);

  // UI state outside reducer
  const [filter, setFilter] = useState({ status: 'all', isDeleted: false, isArchived: false });
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [view, setView] = useState('list');

  // Filter logic
  const filteredEntities = useMemo(() => {
    let result = [...entities];
    if (filter.status !== 'all') {
      result = result.filter(e => e.status === filter.status);
    }
    if (!filter.isDeleted) {
      result = result.filter(e => !e.isDeleted);
    }
    if (!filter.isArchived) {
      result = result.filter(e => !e.isArchived);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(e => 
        e.name?.toLowerCase().includes(q) || 
        e.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [entities, filter, search]);

  // Selection
  const selectEntity = useCallback((id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const selectAll = useCallback(() => {
    const visible = filteredEntities.map(e => e.id);
    const allSelected = visible.every(id => selectedIds.includes(id));
    setSelectedIds(allSelected ? [] : visible);
  }, [filteredEntities, selectedIds]);

  const deselectAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('entities');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.forEach(entity => {
          dispatch({ type: CREATE_ENTITY, payload: entity });
        });
      } catch (e) {
        console.error('Failed to load entities', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('entities', JSON.stringify(entities));
  }, [entities]);

  const value = {
    entities: filteredEntities,
    allEntities: entities,
    filter,
    setFilter,
    search,
    setSearch,
    view,
    setView,
    selectedIds,
    selectEntity,
    selectAll,
    deselectAll,
    createEntity,
    readEntity,
    updateEntity,
    patchEntity,
    deleteEntity,
    softDeleteEntity,
    restoreEntity,
    duplicateEntity,
    mergeEntity,
    archiveEntity,
    unarchiveEntity
  };

  return (
    <EntityContext.Provider value={value}>
      {children}
    </EntityContext.Provider>
  );
}

function useEntities(){
  const context = useContext(EntityContext);
  if (context === null) {
    throw new Error("useEntities must be used within an EntityProvider");
  }
  return context;
}

export { EntityProvider, useEntities };



import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const BulkContext = createContext(null);

const BULK_CREATE = "BULK_CREATE";
const BULK_UPDATE = "BULK_UPDATE";
const BULK_DELETE = "BULK_DELETE";
const BULK_PATCH = "BULK_PATCH";
const BULK_ARCHIVE = "BULK_ARCHIVE";
const BULK_RESTORE = "BULK_RESTORE";
const BULK_DUPLICATE = "BULK_DUPLICATE";
const BULK_ASSIGN = "BULK_ASSIGN";
const BULK_TAG = "BULK_TAG";
const BULK_UNTAG = "BULK_UNTAG";
const BULK_STATUS_CHANGE = "BULK_STATUS_CHANGE";
const BULK_PRIORITY_CHANGE = "BULK_PRIORITY_CHANGE";
const BULK_CATEGORY_CHANGE = "BULK_CATEGORY_CHANGE";
const BULK_MOVE = "BULK_MOVE";
const BULK_EXPORT = "BULK_EXPORT";
const BULK_IMPORT = "BULK_IMPORT";
const BULK_VALIDATE = "BULK_VALIDATE";
const BULK_APPROVE = "BULK_APPROVE";
const BULK_REJECT = "BULK_REJECT";
const BULK_SUBMIT = "BULK_SUBMIT";
const BULK_PUBLISH = "BULK_PUBLISH";
const BULK_UNPUBLISH = "BULK_UNPUBLISH";
const BULK_LOCK = "BULK_LOCK";
const BULK_UNLOCK = "BULK_UNLOCK";

function bulkReducer(state, action){
  switch(action.type){
    case BULK_CREATE:
      return [...action.payload.map(item => ({ ...item, id: crypto.randomUUID(), createdAt: Date.now() })), ...state];
    case BULK_UPDATE:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, ...action.payload.data, updatedAt: Date.now() } 
          : item
      );
    case BULK_DELETE:
      return state.filter(item => !action.payload.includes(item.id));
    case BULK_PATCH:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, ...action.payload.data, updatedAt: Date.now() } 
          : item
      );
    case BULK_ARCHIVE:
      return state.map(item => 
        action.payload.includes(item.id) 
          ? { ...item, archivedAt: Date.now(), isArchived: true } 
          : item
      );
    case BULK_RESTORE:
      return state.map(item => 
        action.payload.includes(item.id) 
          ? { ...item, archivedAt: null, isArchived: false, deletedAt: null, isDeleted: false } 
          : item
      );
    case BULK_DUPLICATE:
      const toClone = state.filter(item => action.payload.includes(item.id));
      const clones = toClone.map(item => ({ ...item, id: crypto.randomUUID(), createdAt: Date.now(), clonedFrom: item.id }));
      return [...clones, ...state];
    case BULK_ASSIGN:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, assignedTo: action.payload.assignee, updatedAt: Date.now() } 
          : item
      );
    case BULK_TAG:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, tags: [...new Set([...(item.tags || []), ...action.payload.tags])], updatedAt: Date.now() } 
          : item
      );
    case BULK_UNTAG:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, tags: (item.tags || []).filter(t => !action.payload.tags.includes(t)), updatedAt: Date.now() } 
          : item
      );
    case BULK_STATUS_CHANGE:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, status: action.payload.status, updatedAt: Date.now() } 
          : item
      );
    case BULK_PRIORITY_CHANGE:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, priority: action.payload.priority, updatedAt: Date.now() } 
          : item
      );
    case BULK_CATEGORY_CHANGE:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, category: action.payload.category, updatedAt: Date.now() } 
          : item
      );
    case BULK_MOVE:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, folderId: action.payload.folderId, projectId: action.payload.projectId, updatedAt: Date.now() } 
          : item
      );
    case BULK_IMPORT:
      return [...action.payload.map(item => ({ ...item, id: crypto.randomUUID(), importedAt: Date.now() })), ...state];
    case BULK_VALIDATE:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, validationErrors: action.payload.errors[item.id] || null, validatedAt: Date.now() } 
          : item
      );
    case BULK_APPROVE:
      return state.map(item => 
        action.payload.includes(item.id) 
          ? { ...item, approvedAt: Date.now(), approvedBy: action.payload.approver, status: 'approved' } 
          : item
      );
    case BULK_REJECT:
      return state.map(item => 
        action.payload.ids.includes(item.id) 
          ? { ...item, rejectedAt: Date.now(), rejectedBy: action.payload.rejector, status: 'rejected', rejectionReason: action.payload.reason } 
          : item
      );
    case BULK_SUBMIT:
      return state.map(item => 
        action.payload.includes(item.id) 
          ? { ...item, submittedAt: Date.now(), status: 'submitted' } 
          : item
      );
    case BULK_PUBLISH:
      return state.map(item => 
        action.payload.includes(item.id) 
          ? { ...item, publishedAt: Date.now(), status: 'published', isPublished: true } 
          : item
      );
    case BULK_UNPUBLISH:
      return state.map(item => 
        action.payload.includes(item.id) 
          ? { ...item, unpublishedAt: Date.now(), status: 'draft', isPublished: false } 
          : item
      );
    case BULK_LOCK:
      return state.map(item => 
        action.payload.includes(item.id) 
          ? { ...item, lockedAt: Date.now(), isLocked: true, lockedBy: action.payload.lockedBy } 
          : item
      );
    case BULK_UNLOCK:
      return state.map(item => 
        action.payload.includes(item.id) 
          ? { ...item, lockedAt: null, isLocked: false, lockedBy: null } 
          : item
      );
    default:
      return state;
  }
}

function BulkProvider({ children }){
  const [items, dispatch] = useReducer(bulkReducer, []);

  const bulkCreate = useCallback((itemsData) => {
    dispatch({ type: BULK_CREATE, payload: itemsData });
  }, []);

  const bulkUpdate = useCallback((ids, data) => {
    dispatch({ type: BULK_UPDATE, payload: { ids, data } });
  }, []);

  const bulkDelete = useCallback((ids) => {
    dispatch({ type: BULK_DELETE, payload: ids });
  }, []);

  const bulkPatch = useCallback((ids, data) => {
    dispatch({ type: BULK_PATCH, payload: { ids, data } });
  }, []);

  const bulkArchive = useCallback((ids) => {
    dispatch({ type: BULK_ARCHIVE, payload: ids });
  }, []);

  const bulkRestore = useCallback((ids) => {
    dispatch({ type: BULK_RESTORE, payload: ids });
  }, []);

  const bulkDuplicate = useCallback((ids) => {
    dispatch({ type: BULK_DUPLICATE, payload: ids });
  }, []);

  const bulkAssign = useCallback((ids, assignee) => {
    dispatch({ type: BULK_ASSIGN, payload: { ids, assignee } });
  }, []);

  const bulkTag = useCallback((ids, tags) => {
    dispatch({ type: BULK_TAG, payload: { ids, tags } });
  }, []);

  const bulkUntag = useCallback((ids, tags) => {
    dispatch({ type: BULK_UNTAG, payload: { ids, tags } });
  }, []);

  const bulkStatusChange = useCallback((ids, status) => {
    dispatch({ type: BULK_STATUS_CHANGE, payload: { ids, status } });
  }, []);

  const bulkPriorityChange = useCallback((ids, priority) => {
    dispatch({ type: BULK_PRIORITY_CHANGE, payload: { ids, priority } });
  }, []);

  const bulkCategoryChange = useCallback((ids, category) => {
    dispatch({ type: BULK_CATEGORY_CHANGE, payload: { ids, category } });
  }, []);

  const bulkMove = useCallback((ids, folderId, projectId) => {
    dispatch({ type: BULK_MOVE, payload: { ids, folderId, projectId } });
  }, []);

  const bulkImport = useCallback((itemsData) => {
    dispatch({ type: BULK_IMPORT, payload: itemsData });
  }, []);

  const bulkValidate = useCallback((ids, errors) => {
    dispatch({ type: BULK_VALIDATE, payload: { ids, errors } });
  }, []);

  const bulkApprove = useCallback((ids, approver) => {
    dispatch({ type: BULK_APPROVE, payload: { ids, approver } });
  }, []);

  const bulkReject = useCallback((ids, rejector, reason) => {
    dispatch({ type: BULK_REJECT, payload: { ids, rejector, reason } });
  }, []);

  const bulkSubmit = useCallback((ids) => {
    dispatch({ type: BULK_SUBMIT, payload: ids });
  }, []);

  const bulkPublish = useCallback((ids) => {
    dispatch({ type: BULK_PUBLISH, payload: ids });
  }, []);

  const bulkUnpublish = useCallback((ids) => {
    dispatch({ type: BULK_UNPUBLISH, payload: ids });
  }, []);

  const bulkLock = useCallback((ids, lockedBy) => {
    dispatch({ type: BULK_LOCK, payload: { ids, lockedBy } });
  }, []);

  const bulkUnlock = useCallback((ids) => {
    dispatch({ type: BULK_UNLOCK, payload: ids });
  }, []);

  // UI state outside reducer
  const [filter, setFilter] = useState({ status: 'all', priority: 'all', category: 'all' });
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [operationProgress, setOperationProgress] = useState(null);

  // Filter logic
  const filteredItems = useMemo(() => {
    let result = [...items];
    if (filter.status !== 'all') {
      result = result.filter(i => i.status === filter.status);
    }
    if (filter.priority !== 'all') {
      result = result.filter(i => i.priority === filter.priority);
    }
    if (filter.category !== 'all') {
      result = result.filter(i => i.category === filter.category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(i => 
        i.name?.toLowerCase().includes(q) || 
        i.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, filter, search]);

  // Selection
  const selectItem = useCallback((id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const selectAll = useCallback(() => {
    const visible = filteredItems.map(i => i.id);
    const allSelected = visible.every(id => selectedIds.includes(id));
    setSelectedIds(allSelected ? [] : visible);
  }, [filteredItems, selectedIds]);

  const deselectAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bulkItems');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.forEach(item => {
          dispatch({ type: BULK_CREATE, payload: [item] });
        });
      } catch (e) {
        console.error('Failed to load items', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('bulkItems', JSON.stringify(items));
  }, [items]);

  const value = {
    items: filteredItems,
    allItems: items,
    filter,
    setFilter,
    search,
    setSearch,
    selectedIds,
    selectItem,
    selectAll,
    deselectAll,
    operationProgress,
    setOperationProgress,
    bulkCreate,
    bulkUpdate,
    bulkDelete,
    bulkPatch,
    bulkArchive,
    bulkRestore,
    bulkDuplicate,
    bulkAssign,
    bulkTag,
    bulkUntag,
    bulkStatusChange,
    bulkPriorityChange,
    bulkCategoryChange,
    bulkMove,
    bulkImport,
    bulkValidate,
    bulkApprove,
    bulkReject,
    bulkSubmit,
    bulkPublish,
    bulkUnpublish,
    bulkLock,
    bulkUnlock
  };

  return (
    <BulkContext.Provider value={value}>
      {children}
    </BulkContext.Provider>
  );
}

function useBulk(){
  const context = useContext(BulkContext);
  if (context === null) {
    throw new Error("useBulk must be used within a BulkProvider");
  }
  return context;
}

export { BulkProvider, useBulk };



        import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const WorkflowContext = createContext(null);

const SET_STATUS = "SET_STATUS";
const SET_SUBSTATUS = "SET_SUBSTATUS";
const SET_STAGE = "SET_STAGE";
const SET_PHASE = "SET_PHASE";
const SET_STATE = "SET_STATE";
const SUBMIT_FOR_APPROVAL = "SUBMIT_FOR_APPROVAL";
const APPROVE = "APPROVE";
const REJECT = "REJECT";
const REQUEST_CHANGES = "REQUEST_CHANGES";
const ESCALATE = "ESCALATE";
const DELEGATE = "DELEGATE";
const REVOKE_APPROVAL = "REVOKE_APPROVAL";
const RETURN_TO_DRAFT = "RETURN_TO_DRAFT";
const SAVE_DRAFT = "SAVE_DRAFT";
const PUBLISH = "PUBLISH";
const UNPUBLISH = "UNPUBLISH";
const SCHEDULE_PUBLISH = "SCHEDULE_PUBLISH";
const SCHEDULE_UNPUBLISH = "SCHEDULE_UNPUBLISH";
const PUBLISH_IMMEDIATELY = "PUBLISH_IMMEDIATELY";
const SET_VISIBILITY = "SET_VISIBILITY";
const SET_ACCESS_LEVEL = "SET_ACCESS_LEVEL";

function workflowReducer(state, action){
  switch(action.type){
    case SET_STATUS:
      return { ...state, status: action.payload, updatedAt: Date.now() };
    case SET_SUBSTATUS:
      return { ...state, substatus: action.payload, updatedAt: Date.now() };
    case SET_STAGE:
      return { ...state, stage: action.payload, updatedAt: Date.now() };
    case SET_PHASE:
      return { ...state, phase: action.payload, updatedAt: Date.now() };
    case SET_STATE:
      return { ...state, state: action.payload, updatedAt: Date.now() };
    case SUBMIT_FOR_APPROVAL:
      return { 
        ...state, 
        status: 'pending_approval', 
        submittedAt: Date.now(), 
        submittedBy: action.payload,
        updatedAt: Date.now() 
      };
    case APPROVE:
      return { 
        ...state, 
        status: 'approved', 
        approvedAt: Date.now(), 
        approvedBy: action.payload,
        updatedAt: Date.now() 
      };
    case REJECT:
      return { 
        ...state, 
        status: 'rejected', 
        rejectedAt: Date.now(), 
        rejectedBy: action.payload.rejector,
        rejectionReason: action.payload.reason,
        updatedAt: Date.now() 
      };
    case REQUEST_CHANGES:
      return { 
        ...state, 
        status: 'changes_requested', 
        changesRequestedAt: Date.now(), 
        changesRequestedBy: action.payload.requestor,
        changeRequestNotes: action.payload.notes,
        updatedAt: Date.now() 
      };
    case ESCALATE:
      return { 
        ...state, 
        status: 'escalated', 
        escalatedAt: Date.now(), 
        escalatedTo: action.payload,
        updatedAt: Date.now() 
      };
    case DELEGATE:
      return { 
        ...state, 
        delegatedTo: action.payload.assignee,
        delegatedAt: Date.now(),
        delegatedBy: action.payload.delegator,
        updatedAt: Date.now() 
      };
    case REVOKE_APPROVAL:
      return { 
        ...state, 
        status: 'draft', 
        approvalRevokedAt: Date.now(), 
        approvalRevokedBy: action.payload,
        approvedAt: null,
        approvedBy: null,
        updatedAt: Date.now() 
      };
    case RETURN_TO_DRAFT:
      return { 
        ...state, 
        status: 'draft', 
        returnedToDraftAt: Date.now(), 
        returnedToDraftBy: action.payload,
        submittedAt: null,
        approvedAt: null,
        rejectedAt: null,
        updatedAt: Date.now() 
      };
    case SAVE_DRAFT:
      return { 
        ...state, 
        ...action.payload, 
        status: 'draft', 
        draftSavedAt: Date.now(),
        updatedAt: Date.now() 
      };
    case PUBLISH:
      return { 
        ...state, 
        status: 'published', 
        publishedAt: Date.now(), 
        publishedBy: action.payload,
        isPublished: true,
        updatedAt: Date.now() 
      };
    case UNPUBLISH:
      return { 
        ...state, 
        status: 'unpublished', 
        unpublishedAt: Date.now(), 
        unpublishedBy: action.payload,
        isPublished: false,
        updatedAt: Date.now() 
      };
    case SCHEDULE_PUBLISH:
      return { 
        ...state, 
        scheduledPublishAt: action.payload.date,
        scheduledPublishBy: action.payload.user,
        updatedAt: Date.now() 
      };
    case SCHEDULE_UNPUBLISH:
      return { 
        ...state, 
        scheduledUnpublishAt: action.payload.date,
        scheduledUnpublishBy: action.payload.user,
        updatedAt: Date.now() 
      };
    case PUBLISH_IMMEDIATELY:
      return { 
        ...state, 
        status: 'published', 
        publishedAt: Date.now(), 
        publishedBy: action.payload,
        isPublished: true,
        scheduledPublishAt: null,
        updatedAt: Date.now() 
      };
    case SET_VISIBILITY:
      return { ...state, visibility: action.payload, updatedAt: Date.now() };
    case SET_ACCESS_LEVEL:
      return { ...state, accessLevel: action.payload, updatedAt: Date.now() };
    default:
      return state;
  }
}

function WorkflowProvider({ children, initialState = {} }){
  const [workflow, dispatch] = useReducer(workflowReducer, {
    status: 'draft',
    substatus: null,
    stage: null,
    phase: null,
    state: null,
    visibility: 'private',
    accessLevel: 'read',
    ...initialState
  });

  const setStatus = useCallback((status) => {
    dispatch({ type: SET_STATUS, payload: status });
  }, []);

  const setSubstatus = useCallback((substatus) => {
    dispatch({ type: SET_SUBSTATUS, payload: substatus });
  }, []);

  const setStage = useCallback((stage) => {
    dispatch({ type: SET_STAGE, payload: stage });
  }, []);

  const setPhase = useCallback((phase) => {
    dispatch({ type: SET_PHASE, payload: phase });
  }, []);

  const setState = useCallback((state) => {
    dispatch({ type: SET_STATE, payload: state });
  }, []);

  const submitForApproval = useCallback((userId) => {
    dispatch({ type: SUBMIT_FOR_APPROVAL, payload: userId });
  }, []);

  const approve = useCallback((userId) => {
    dispatch({ type: APPROVE, payload: userId });
  }, []);

  const reject = useCallback((rejector, reason) => {
    dispatch({ type: REJECT, payload: { rejector, reason } });
  }, []);

  const requestChanges = useCallback((requestor, notes) => {
    dispatch({ type: REQUEST_CHANGES, payload: { requestor, notes } });
  }, []);

  const escalate = useCallback((escalatedTo) => {
    dispatch({ type: ESCALATE, payload: escalatedTo });
  }, []);

  const delegate = useCallback((delegator, assignee) => {
    dispatch({ type: DELEGATE, payload: { delegator, assignee } });
  }, []);

  const revokeApproval = useCallback((userId) => {
    dispatch({ type: REVOKE_APPROVAL, payload: userId });
  }, []);

  const returnToDraft = useCallback((userId) => {
    dispatch({ type: RETURN_TO_DRAFT, payload: userId });
  }, []);

  const saveDraft = useCallback((data) => {
    dispatch({ type: SAVE_DRAFT, payload: data });
  }, []);

  const publish = useCallback((userId) => {
    dispatch({ type: PUBLISH, payload: userId });
  }, []);

  const unpublish = useCallback((userId) => {
    dispatch({ type: UNPUBLISH, payload: userId });
  }, []);

  const schedulePublish = useCallback((date, userId) => {
    dispatch({ type: SCHEDULE_PUBLISH, payload: { date, user: userId } });
  }, []);

  const scheduleUnpublish = useCallback((date, userId) => {
    dispatch({ type: SCHEDULE_UNPUBLISH, payload: { date, user: userId } });
  }, []);

  const publishImmediately = useCallback((userId) => {
    dispatch({ type: PUBLISH_IMMEDIATELY, payload: userId });
  }, []);

  const setVisibility = useCallback((visibility) => {
    dispatch({ type: SET_VISIBILITY, payload: visibility });
  }, []);

  const setAccessLevel = useCallback((level) => {
    dispatch({ type: SET_ACCESS_LEVEL, payload: level });
  }, []);

  // UI state outside reducer
  const [history, setHistory] = useState([]);
  const [canUndo, setCanUndo] = useState(false);

  // Track history
  useEffect(() => {
    setHistory(prev => [...prev, workflow]);
    setCanUndo(history.length > 0);
  }, [workflow.status, workflow.substatus, workflow.stage, workflow.phase, workflow.state]);

  const undo = useCallback(() => {
    if (history.length > 1) {
      const previous = history[history.length - 2];
      dispatch({ type: SET_STATE, payload: previous.state });
      setHistory(prev => prev.slice(0, -1));
    }
  }, [history]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('workflow');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(key => {
          if (parsed[key] !== undefined) {
            dispatch({ type: `SET_${key.toUpperCase()}`, payload: parsed[key] });
          }
        });
      } catch (e) {
        console.error('Failed to load workflow', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('workflow', JSON.stringify(workflow));
  }, [workflow]);

  const value = {
    workflow,
    history,
    canUndo,
    undo,
    setStatus,
    setSubstatus,
    setStage,
    setPhase,
    setState,
    submitForApproval,
    approve,
    reject,
    requestChanges,
    escalate,
    delegate,
    revokeApproval,
    returnToDraft,
    saveDraft,
    publish,
    unpublish,
    schedulePublish,
    scheduleUnpublish,
    publishImmediately,
    setVisibility,
    setAccessLevel
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}

function useWorkflow(){
  const context = useContext(WorkflowContext);
  if (context === null) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
}

export { WorkflowProvider, useWorkflow };



import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const SelectionContext = createContext(null);

const SELECT_ITEM = "SELECT_ITEM";
const DESELECT_ITEM = "DESELECT_ITEM";
const TOGGLE_SELECTION = "TOGGLE_SELECTION";
const SELECT_RANGE = "SELECT_RANGE";
const SELECT_ALL = "SELECT_ALL";
const DESELECT_ALL = "DESELECT_ALL";
const SELECT_NONE = "SELECT_NONE";
const INVERT_SELECTION = "INVERT_SELECTION";
const SELECT_MULTIPLE = "SELECT_MULTIPLE";
const ADD_TO_SELECTION = "ADD_TO_SELECTION";
const REMOVE_FROM_SELECTION = "REMOVE_FROM_SELECTION";
const SET_SELECTION = "SET_SELECTION";
const SET_ACTIVE_ITEM = "SET_ACTIVE_ITEM";
const CLEAR_ACTIVE_ITEM = "CLEAR_ACTIVE_ITEM";
const SET_FOCUSED_ITEM = "SET_FOCUSED_ITEM";
const SET_HOVERED_ITEM = "SET_HOVERED_ITEM";

function selectionReducer(state, action){
  switch(action.type){
    case SELECT_ITEM:
      return { 
        ...state, 
        selectedIds: [...state.selectedIds, action.payload],
        lastSelected: action.payload 
      };
    case DESELECT_ITEM:
      return { 
        ...state, 
        selectedIds: state.selectedIds.filter(id => id !== action.payload),
        activeItemId: state.activeItemId === action.payload ? null : state.activeItemId
      };
    case TOGGLE_SELECTION:
      return state.selectedIds.includes(action.payload)
        ? { 
            ...state, 
            selectedIds: state.selectedIds.filter(id => id !== action.payload),
            lastSelected: state.lastSelected === action.payload ? null : state.lastSelected
          }
        : { 
            ...state, 
            selectedIds: [...state.selectedIds, action.payload],
            lastSelected: action.payload 
          };
    case SELECT_RANGE:
      const { start, end, allIds } = action.payload;
      const startIndex = allIds.indexOf(start);
      const endIndex = allIds.indexOf(end);
      const [rangeStart, rangeEnd] = startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];
      const rangeIds = allIds.slice(rangeStart, rangeEnd + 1);
      return { 
        ...state, 
        selectedIds: [...new Set([...state.selectedIds, ...rangeIds])],
        lastSelected: end 
      };
    case SELECT_ALL:
      return { ...state, selectedIds: [...action.payload] };
    case DESELECT_ALL:
    case SELECT_NONE:
      return { ...state, selectedIds: [], activeItemId: null, focusedItemId: null };
    case INVERT_SELECTION:
      const allIds = action.payload;
      return { 
        ...state, 
        selectedIds: allIds.filter(id => !state.selectedIds.includes(id)),
        lastSelected: null 
      };
    case SELECT_MULTIPLE:
      return { 
        ...state, 
        selectedIds: [...new Set([...state.selectedIds, ...action.payload])] 
      };
    case ADD_TO_SELECTION:
      return { 
        ...state, 
        selectedIds: [...new Set([...state.selectedIds, ...action.payload])] 
      };
    case REMOVE_FROM_SELECTION:
      return { 
        ...state, 
        selectedIds: state.selectedIds.filter(id => !action.payload.includes(id)) 
      };
    case SET_SELECTION:
      return { ...state, selectedIds: [...action.payload], lastSelected: action.payload[action.payload.length - 1] || null };
    case SET_ACTIVE_ITEM:
      return { ...state, activeItemId: action.payload };
    case CLEAR_ACTIVE_ITEM:
      return { ...state, activeItemId: null };
    case SET_FOCUSED_ITEM:
      return { ...state, focusedItemId: action.payload };
    case SET_HOVERED_ITEM:
      return { ...state, hoveredItemId: action.payload };
    default:
      return state;
  }
}

function SelectionProvider({ children }){
  const [selection, dispatch] = useReducer(selectionReducer, {
    selectedIds: [],
    activeItemId: null,
    focusedItemId: null,
    hoveredItemId: null,
    lastSelected: null
  });

  const selectItem = useCallback((id) => {
    dispatch({ type: SELECT_ITEM, payload: id });
  }, []);

  const deselectItem = useCallback((id) => {
    dispatch({ type: DESELECT_ITEM, payload: id });
  }, []);

  const toggleSelection = useCallback((id) => {
    dispatch({ type: TOGGLE_SELECTION, payload: id });
  }, []);

  const selectRange = useCallback((start, end, allIds) => {
    dispatch({ type: SELECT_RANGE, payload: { start, end, allIds } });
  }, []);

  const selectAll = useCallback((ids) => {
    dispatch({ type: SELECT_ALL, payload: ids });
  }, []);

  const deselectAll = useCallback(() => {
    dispatch({ type: DESELECT_ALL });
  }, []);

  const selectNone = useCallback(() => {
    dispatch({ type: SELECT_NONE });
  }, []);

  const invertSelection = useCallback((allIds) => {
    dispatch({ type: INVERT_SELECTION, payload: allIds });
  }, []);

  const selectMultiple = useCallback((ids) => {
    dispatch({ type: SELECT_MULTIPLE, payload: ids });
  }, []);

  const addToSelection = useCallback((ids) => {
    dispatch({ type: ADD_TO_SELECTION, payload: ids });
  }, []);

  const removeFromSelection = useCallback((ids) => {
    dispatch({ type: REMOVE_FROM_SELECTION, payload: ids });
  }, []);

  const setSelection = useCallback((ids) => {
    dispatch({ type: SET_SELECTION, payload: ids });
  }, []);

  const setActiveItem = useCallback((id) => {
    dispatch({ type: SET_ACTIVE_ITEM, payload: id });
  }, []);

  const clearActiveItem = useCallback(() => {
    dispatch({ type: CLEAR_ACTIVE_ITEM });
  }, []);

  const setFocusedItem = useCallback((id) => {
    dispatch({ type: SET_FOCUSED_ITEM, payload: id });
  }, []);

  const setHoveredItem = useCallback((id) => {
    dispatch({ type: SET_HOVERED_ITEM, payload: id });
  }, []);

  // UI state outside reducer
  const [selectMode, setSelectMode] = useState('single'); // single, multiple, range
  const [anchorItem, setAnchorItem] = useState(null);

  // Computed
  const hasSelection = useMemo(() => selection.selectedIds.length > 0, [selection.selectedIds]);
  const selectionCount = useMemo(() => selection.selectedIds.length, [selection.selectedIds]);
  const isSelected = useCallback((id) => selection.selectedIds.includes(id), [selection.selectedIds]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selection');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: SET_SELECTION, payload: parsed.selectedIds || [] });
        if (parsed.activeItemId) dispatch({ type: SET_ACTIVE_ITEM, payload: parsed.activeItemId });
      } catch (e) {
        console.error('Failed to load selection', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('selection', JSON.stringify({
      selectedIds: selection.selectedIds,
      activeItemId: selection.activeItemId
    }));
  }, [selection.selectedIds, selection.activeItemId]);

  const value = {
    selection,
    selectMode,
    setSelectMode,
    anchorItem,
    setAnchorItem,
    hasSelection,
    selectionCount,
    isSelected,
    selectItem,
    deselectItem,
    toggleSelection,
    selectRange,
    selectAll,
    deselectAll,
    selectNone,
    invertSelection,
    selectMultiple,
    addToSelection,
    removeFromSelection,
    setSelection,
    setActiveItem,
    clearActiveItem,
    setFocusedItem,
    setHoveredItem
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

function useSelection(){
  const context = useContext(SelectionContext);
  if (context === null) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}

export { SelectionProvider, useSelection };


import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const FilterContext = createContext(null);

const SET_FILTER = "SET_FILTER";
const ADD_FILTER = "ADD_FILTER";
const REMOVE_FILTER = "REMOVE_FILTER";
const CLEAR_FILTER = "CLEAR_FILTER";
const CLEAR_ALL_FILTERS = "CLEAR_ALL_FILTERS";
const TOGGLE_FILTER = "TOGGLE_FILTER";
const APPLY_FILTER_PRESET = "APPLY_FILTER_PRESET";
const SAVE_FILTER_PRESET = "SAVE_FILTER_PRESET";
const DELETE_FILTER_PRESET = "DELETE_FILTER_PRESET";
const SET_SEARCH = "SET_SEARCH";
const CLEAR_SEARCH = "CLEAR_SEARCH";
const EXECUTE_SEARCH = "EXECUTE_SEARCH";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
const APPEND_SEARCH_RESULTS = "APPEND_SEARCH_RESULTS";
const SET_SEARCH_LOADING = "SET_SEARCH_LOADING";
const SET_SEARCH_ERROR = "SET_SEARCH_ERROR";
const SET_SORT = "SET_SORT";
const SET_SORT_FIELD = "SET_SORT_FIELD";
const SET_SORT_DIRECTION = "SET_SORT_DIRECTION";
const TOGGLE_SORT_DIRECTION = "TOGGLE_SORT_DIRECTION";
const CLEAR_SORT = "CLEAR_SORT";
const ADD_SORT = "ADD_SORT";
const REMOVE_SORT = "REMOVE_SORT";
const SET_GROUP_BY = "SET_GROUP_BY";
const CLEAR_GROUP_BY = "CLEAR_GROUP_BY";
const EXPAND_GROUP = "EXPAND_GROUP";
const COLLAPSE_GROUP = "COLLAPSE_GROUP";
const EXPAND_ALL_GROUPS = "EXPAND_ALL_GROUPS";
const COLLAPSE_ALL_GROUPS = "COLLAPSE_ALL_GROUPS";

function filterReducer(state, action){
  switch(action.type){
    case SET_FILTER:
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        activeFilterCount: Object.keys({ ...state.filters, ...action.payload }).length 
      };
    case ADD_FILTER:
      return { 
        ...state, 
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
        activeFilterCount: Object.keys({ ...state.filters, [action.payload.key]: action.payload.value }).length 
      };
    case REMOVE_FILTER:
      const { [action.payload]: _, ...remainingFilters } = state.filters;
      return { 
        ...state, 
        filters: remainingFilters,
        activeFilterCount: Object.keys(remainingFilters).length 
      };
    case CLEAR_FILTER:
      const { [action.payload]: __, ...restFilters } = state.filters;
      return { 
        ...state, 
        filters: restFilters,
        activeFilterCount: Object.keys(restFilters).length 
      };
    case CLEAR_ALL_FILTERS:
      return { ...state, filters: {}, activeFilterCount: 0 };
    case TOGGLE_FILTER:
      const currentValue = state.filters[action.payload.key];
      const newValue = currentValue === action.payload.value ? undefined : action.payload.value;
      const newFilters = { ...state.filters };
      if (newValue === undefined) {
        delete newFilters[action.payload.key];
      } else {
        newFilters[action.payload.key] = newValue;
      }
      return { 
        ...state, 
        filters: newFilters,
        activeFilterCount: Object.keys(newFilters).length 
      };
    case APPLY_FILTER_PRESET:
      return { 
        ...state, 
        filters: action.payload.filters,
        activeFilterCount: Object.keys(action.payload.filters).length,
        activePresetId: action.payload.id 
      };
    case SAVE_FILTER_PRESET:
      return { 
        ...state, 
        presets: [...state.presets, { ...action.payload, id: crypto.randomUUID() }] 
      };
    case DELETE_FILTER_PRESET:
      return { 
        ...state, 
        presets: state.presets.filter(p => p.id !== action.payload),
        activePresetId: state.activePresetId === action.payload ? null : state.activePresetId
      };
    case SET_SEARCH:
      return { ...state, searchQuery: action.payload, searchResults: [], searchError: null };
    case CLEAR_SEARCH:
      return { ...state, searchQuery: '', searchResults: [], searchError: null, isSearching: false };
    case EXECUTE_SEARCH:
      return { ...state, isSearching: true, searchError: null };
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload, isSearching: false, searchError: null };
    case APPEND_SEARCH_RESULTS:
      return { ...state, searchResults: [...state.searchResults, ...action.payload] };
    case SET_SEARCH_LOADING:
      return { ...state, isSearching: action.payload };
    case SET_SEARCH_ERROR:
      return { ...state, searchError: action.payload, isSearching: false };
    case SET_SORT:
      return { ...state, sort: action.payload };
    case SET_SORT_FIELD:
      return { ...state, sort: { ...state.sort, field: action.payload } };
    case SET_SORT_DIRECTION:
      return { ...state, sort: { ...state.sort, direction: action.payload } };
    case TOGGLE_SORT_DIRECTION:
      return { 
        ...state, 
        sort: { 
          ...state.sort, 
          direction: state.sort.direction === 'asc' ? 'desc' : 'asc' 
        } 
      };
    case CLEAR_SORT:
      return { ...state, sort: { field: null, direction: 'asc' } };
    case ADD_SORT:
      const existingSortIndex = state.multiSort.findIndex(s => s.field === action.payload.field);
      if (existingSortIndex >= 0) {
        const newMultiSort = [...state.multiSort];
        newMultiSort[existingSortIndex] = action.payload;
        return { ...state, multiSort: newMultiSort };
      }
      return { ...state, multiSort: [...state.multiSort, action.payload] };
    case REMOVE_SORT:
      return { ...state, multiSort: state.multiSort.filter(s => s.field !== action.payload) };
    case SET_GROUP_BY:
      return { ...state, groupBy: action.payload, expandedGroups: {} };
    case CLEAR_GROUP_BY:
      return { ...state, groupBy: null, expandedGroups: {} };
    case EXPAND_GROUP:
      return { ...state, expandedGroups: { ...state.expandedGroups, [action.payload]: true } };
    case COLLAPSE_GROUP:
      return { ...state, expandedGroups: { ...state.expandedGroups, [action.payload]: false } };
    case EXPAND_ALL_GROUPS:
      const allExpanded = {};
      action.payload.forEach(key => { allExpanded[key] = true; });
      return { ...state, expandedGroups: allExpanded };
    case COLLAPSE_ALL_GROUPS:
      return { ...state, expandedGroups: {} };
    default:
      return state;
  }
}

function FilterProvider({ children }){
  const [filterState, dispatch] = useReducer(filterReducer, {
    filters: {},
    activeFilterCount: 0,
    presets: [],
    activePresetId: null,
    searchQuery: '',
    searchResults: [],
    isSearching: false,
    searchError: null,
    sort: { field: null, direction: 'asc' },
    multiSort: [],
    groupBy: null,
    expandedGroups: {}
  });

  const setFilter = useCallback((filters) => {
    dispatch({ type: SET_FILTER, payload: filters });
  }, []);

  const addFilter = useCallback((key, value) => {
    dispatch({ type: ADD_FILTER, payload: { key, value } });
  }, []);

  const removeFilter = useCallback((key) => {
    dispatch({ type: REMOVE_FILTER, payload: key });
  }, []);

  const clearFilter = useCallback((key) => {
    dispatch({ type: CLEAR_FILTER, payload: key });
  }, []);

  const clearAllFilters = useCallback(() => {
    dispatch({ type: CLEAR_ALL_FILTERS });
  }, []);

  const toggleFilter = useCallback((key, value) => {
    dispatch({ type: TOGGLE_FILTER, payload: { key, value } });
  }, []);

  const applyFilterPreset = useCallback((id, filters) => {
    dispatch({ type: APPLY_FILTER_PRESET, payload: { id, filters } });
  }, []);

  const saveFilterPreset = useCallback((name, filters) => {
    dispatch({ type: SAVE_FILTER_PRESET, payload: { name, filters } });
  }, []);

  const deleteFilterPreset = useCallback((id) => {
    dispatch({ type: DELETE_FILTER_PRESET, payload: id });
  }, []);

  const setSearch = useCallback((query) => {
    dispatch({ type: SET_SEARCH, payload: query });
  }, []);

  const clearSearch = useCallback(() => {
    dispatch({ type: CLEAR_SEARCH });
  }, []);

  const executeSearch = useCallback(() => {
    dispatch({ type: EXECUTE_SEARCH });
  }, []);

  const setSearchQuery = useCallback((query) => {
    dispatch({ type: SET_SEARCH_QUERY, payload: query });
  }, []);

  const setSearchResults = useCallback((results) => {
    dispatch({ type: SET_SEARCH_RESULTS, payload: results });
  }, []);

  const appendSearchResults = useCallback((results) => {
    dispatch({ type: APPEND_SEARCH_RESULTS, payload: results });
  }, []);

  const setSearchLoading = useCallback((loading) => {
    dispatch({ type: SET_SEARCH_LOADING, payload: loading });
  }, []);

  const setSearchError = useCallback((error) => {
    dispatch({ type: SET_SEARCH_ERROR, payload: error });
  }, []);

  const setSort = useCallback((sort) => {
    dispatch({ type: SET_SORT, payload: sort });
  }, []);

  const setSortField = useCallback((field) => {
    dispatch({ type: SET_SORT_FIELD, payload: field });
  }, []);

  const setSortDirection = useCallback((direction) => {
    dispatch({ type: SET_SORT_DIRECTION, payload: direction });
  }, []);

  const toggleSortDirection = useCallback(() => {
    dispatch({ type: TOGGLE_SORT_DIRECTION });
  }, []);

  const clearSort = useCallback(() => {
    dispatch({ type: CLEAR_SORT });
  }, []);

  const addSort = useCallback((field, direction = 'asc') => {
    dispatch({ type: ADD_SORT, payload: { field, direction } });
  }, []);

  const removeSort = useCallback((field) => {
    dispatch({ type: REMOVE_SORT, payload: field });
  }, []);

  const setGroupBy = useCallback((field) => {
    dispatch({ type: SET_GROUP_BY, payload: field });
  }, []);

  const clearGroupBy = useCallback(() => {
    dispatch({ type: CLEAR_GROUP_BY });
  }, []);

  const expandGroup = useCallback((key) => {
    dispatch({ type: EXPAND_GROUP, payload: key });
  }, []);

  const collapseGroup = useCallback((key) => {
    dispatch({ type: COLLAPSE_GROUP, payload: key });
  }, []);

  const expandAllGroups = useCallback((keys) => {
    dispatch({ type: EXPAND_ALL_GROUPS, payload: keys });
  }, []);

  const collapseAllGroups = useCallback(() => {
    dispatch({ type: COLLAPSE_ALL_GROUPS });
  }, []);

  // UI state outside reducer
  const [data, setData] = useState([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Filter logic
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Apply filters
    Object.entries(filterState.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== 'all') {
        result = result.filter(item => {
          const itemValue = item[key];
          if (Array.isArray(value)) {
            return value.includes(itemValue);
          }
          if (typeof value === 'object') {
            const { min, max } = value;
            if (min !== undefined && itemValue < min) return false;
            if (max !== undefined && itemValue > max) return false;
            return true;
          }
          return itemValue === value;
        });
      }
    });

    // Apply search
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      result = result.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(q)
        )
      );
    }

    // Apply sort
    if (filterState.sort.field) {
      result.sort((a, b) => {
        const aVal = a[filterState.sort.field];
        const bVal = b[filterState.sort.field];
        const modifier = filterState.sort.direction === 'asc' ? 1 : -1;
        if (aVal < bVal) return -1 * modifier;
        if (aVal > bVal) return 1 * modifier;
        return 0;
      });
    }

    // Apply multi-sort
    if (filterState.multiSort.length > 0) {
      result.sort((a, b) => {
        for (const sort of filterState.multiSort) {
          const aVal = a[sort.field];
          const bVal = b[sort.field];
          const modifier = sort.direction === 'asc' ? 1 : -1;
          if (aVal < bVal) return -1 * modifier;
          if (aVal > bVal) return 1 * modifier;
        }
        return 0;
      });
    }

    return result;
  }, [data, filterState.filters, filterState.searchQuery, filterState.sort, filterState.multiSort]);

  // Grouped data
  const groupedData = useMemo(() => {
    if (!filterState.groupBy) return null;
    const groups = {};
    filteredData.forEach(item => {
      const key = item[filterState.groupBy] || 'Uncategorized';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  }, [filteredData, filterState.groupBy]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('filterState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.filters) dispatch({ type: SET_FILTER, payload: parsed.filters });
        if (parsed.sort) dispatch({ type: SET_SORT, payload: parsed.sort });
        if (parsed.presets) parsed.presets.forEach(p => dispatch({ type: SAVE_FILTER_PRESET, payload: p }));
      } catch (e) {
        console.error('Failed to load filter state', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('filterState', JSON.stringify({
      filters: filterState.filters,
      sort: filterState.sort,
      presets: filterState.presets
    }));
  }, [filterState.filters, filterState.sort, filterState.presets]);

  const value = {
    filterState,
    data,
    setData,
    filteredData,
    groupedData,
    isFilterPanelOpen,
    setIsFilterPanelOpen,
    setFilter,
    addFilter,
    removeFilter,
    clearFilter,
    clearAllFilters,
    toggleFilter,
    applyFilterPreset,
    saveFilterPreset,
    deleteFilterPreset,
    setSearch,
    clearSearch,
    executeSearch,
    setSearchQuery,
    setSearchResults,
    appendSearchResults,
    setSearchLoading,
    setSearchError,
    setSort,
    setSortField,
    setSortDirection,
    toggleSortDirection,
    clearSort,
    addSort,
    removeSort,
    setGroupBy,
    clearGroupBy,
    expandGroup,
    collapseGroup,
    expandAllGroups,
    collapseAllGroups
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

function useFilter(){
  const context = useContext(FilterContext);
  if (context === null) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}

export { FilterProvider, useFilter };





import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const PaginationContext = createContext(null);

const SET_PAGE = "SET_PAGE";
const NEXT_PAGE = "NEXT_PAGE";
const PREVIOUS_PAGE = "PREVIOUS_PAGE";
const FIRST_PAGE = "FIRST_PAGE";
const LAST_PAGE = "LAST_PAGE";
const GO_TO_PAGE = "GO_TO_PAGE";
const SET_PER_PAGE = "SET_PER_PAGE";
const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
const SET_TOTAL_ITEMS = "SET_TOTAL_ITEMS";
const SET_LOADING = "SET_LOADING";
const SET_LOADING_MORE = "SET_LOADING_MORE";
const SET_REFRESHING = "SET_REFRESHING";
const SET_FETCHING = "SET_FETCHING";
const SET_STALE = "SET_STALE";
const SET_UP_TO_DATE = "SET_UP_TO_DATE";
const INVALIDATE_CACHE = "INVALIDATE_CACHE";
const REFRESH_DATA = "REFRESH_DATA";
const RELOAD_DATA = "RELOAD_DATA";
const LOAD_MORE = "LOAD_MORE";
const LOAD_ALL = "LOAD_ALL";
const SET_HAS_MORE = "SET_HAS_MORE";
const SET_CURSOR = "SET_CURSOR";
const SET_OFFSET = "SET_OFFSET";

function paginationReducer(state, action){
  switch(action.type){
    case SET_PAGE:
      return { ...state, currentPage: action.payload };
    case NEXT_PAGE:
      return { ...state, currentPage: Math.min(state.currentPage + 1, state.totalPages) };
    case PREVIOUS_PAGE:
      return { ...state, currentPage: Math.max(state.currentPage - 1, 1) };
    case FIRST_PAGE:
      return { ...state, currentPage: 1 };
    case LAST_PAGE:
      return { ...state, currentPage: state.totalPages };
    case GO_TO_PAGE:
      return { ...state, currentPage: Math.max(1, Math.min(action.payload, state.totalPages)) };
    case SET_PER_PAGE:
      return { ...state, perPage: action.payload, currentPage: 1 };
    case SET_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    case SET_TOTAL_ITEMS:
      return { ...state, totalItems: action.payload, totalPages: Math.ceil(action.payload / state.perPage) };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_LOADING_MORE:
      return { ...state, isLoadingMore: action.payload };
    case SET_REFRESHING:
      return { ...state, isRefreshing: action.payload };
    case SET_FETCHING:
      return { ...state, isFetching: action.payload };
    case SET_STALE:
      return { ...state, isStale: true };
    case SET_UP_TO_DATE:
      return { ...state, isStale: false, lastUpdated: Date.now() };
    case INVALIDATE_CACHE:
      return { ...state, cache: {}, isStale: true };
    case REFRESH_DATA:
      return { ...state, isRefreshing: true, currentPage: 1 };
    case RELOAD_DATA:
      return { ...state, isLoading: true, currentPage: 1, data: [] };
    case LOAD_MORE:
      return { ...state, isLoadingMore: true };
    case LOAD_ALL:
      return { ...state, isLoading: true, currentPage: 1, perPage: action.payload || state.totalItems };
    case SET_HAS_MORE:
      return { ...state, hasMore: action.payload };
    case SET_CURSOR:
      return { ...state, cursor: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    default:
      return state;
  }
}

function PaginationProvider({ children, defaultPerPage = 10 }){
  const [pagination, dispatch] = useReducer(paginationReducer, {
    currentPage: 1,
    perPage: defaultPerPage,
    totalPages: 1,
    totalItems: 0,
    isLoading: false,
    isLoadingMore: false,
    isRefreshing: false,
    isFetching: false,
    isStale: false,
    lastUpdated: null,
    hasMore: true,
    cursor: null,
    offset: 0,
    cache: {}
  });

  const [data, setData] = useState([]);

  const setPage = useCallback((page) => {
    dispatch({ type: SET_PAGE, payload: page });
  }, []);

  const nextPage = useCallback(() => {
    dispatch({ type: NEXT_PAGE });
  }, []);

  const previousPage = useCallback(() => {
    dispatch({ type: PREVIOUS_PAGE });
  }, []);

  const firstPage = useCallback(() => {
    dispatch({ type: FIRST_PAGE });
  }, []);

  const lastPage = useCallback(() => {
    dispatch({ type: LAST_PAGE });
  }, []);

  const goToPage = useCallback((page) => {
    dispatch({ type: GO_TO_PAGE, payload: page });
  }, []);

  const setPerPage = useCallback((count) => {
    dispatch({ type: SET_PER_PAGE, payload: count });
  }, []);

  const setTotalPages = useCallback((pages) => {
    dispatch({ type: SET_TOTAL_PAGES, payload: pages });
  }, []);

  const setTotalItems = useCallback((count) => {
    dispatch({ type: SET_TOTAL_ITEMS, payload: count });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: SET_LOADING, payload: loading });
  }, []);

  const setLoadingMore = useCallback((loading) => {
    dispatch({ type: SET_LOADING_MORE, payload: loading });
  }, []);

  const setRefreshing = useCallback((refreshing) => {
    dispatch({ type: SET_REFRESHING, payload: refreshing });
  }, []);

  const setFetching = useCallback((fetching) => {
    dispatch({ type: SET_FETCHING, payload: fetching });
  }, []);

  const setStale = useCallback(() => {
    dispatch({ type: SET_STALE });
  }, []);

  const setUpToDate = useCallback(() => {
    dispatch({ type: SET_UP_TO_DATE });
  }, []);

  const invalidateCache = useCallback(() => {
    dispatch({ type: INVALIDATE_CACHE });
  }, []);

  const refreshData = useCallback(() => {
    dispatch({ type: REFRESH_DATA });
  }, []);

  const reloadData = useCallback(() => {
    dispatch({ type: RELOAD_DATA });
  }, []);

  const loadMore = useCallback(() => {
    dispatch({ type: LOAD_MORE });
  }, []);

  const loadAll = useCallback((count) => {
    dispatch({ type: LOAD_ALL, payload: count });
  }, []);

  const setHasMore = useCallback((hasMore) => {
    dispatch({ type: SET_HAS_MORE, payload: hasMore });
  }, []);

  const setCursor = useCallback((cursor) => {
    dispatch({ type: SET_CURSOR, payload: cursor });
  }, []);

  const setOffset = useCallback((offset) => {
    dispatch({ type: SET_OFFSET, payload: offset });
  }, []);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.perPage;
    const end = start + pagination.perPage;
    return data.slice(start, end);
  }, [data, pagination.currentPage, pagination.perPage]);

  const pageRange = useMemo(() => {
    const range = [];
    const start = Math.max(1, pagination.currentPage - 2);
    const end = Math.min(pagination.totalPages, pagination.currentPage + 2);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }, [pagination.currentPage, pagination.totalPages]);

  const canGoNext = useMemo(() => 
    pagination.currentPage < pagination.totalPages, 
    [pagination.currentPage, pagination.totalPages]
  );

  const canGoPrevious = useMemo(() => 
    pagination.currentPage > 1, 
    [pagination.currentPage]
  );

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pagination');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.perPage) dispatch({ type: SET_PER_PAGE, payload: parsed.perPage });
      } catch (e) {
        console.error('Failed to load pagination', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('pagination', JSON.stringify({
      perPage: pagination.perPage
    }));
  }, [pagination.perPage]);

  const value = {
    pagination,
    data,
    setData,
    paginatedData,
    pageRange,
    canGoNext,
    canGoPrevious,
    setPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    goToPage,
    setPerPage,
    setTotalPages,
    setTotalItems,
    setLoading,
    setLoadingMore,
    setRefreshing,
    setFetching,
    setStale,
    setUpToDate,
    invalidateCache,
    refreshData,
    reloadData,
    loadMore,
    loadAll,
    setHasMore,
    setCursor,
    setOffset
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
}

function usePagination(){
  const context = useContext(PaginationContext);
  if (context === null) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
}

export { PaginationProvider, usePagination };




import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const ViewContext = createContext(null);

const SET_VIEW = "SET_VIEW";
const SET_VIEW_MODE = "SET_VIEW_MODE";
const TOGGLE_VIEW = "TOGGLE_VIEW";
const SET_DENSITY = "SET_DENSITY";
const SET_ZOOM = "SET_ZOOM";
const SET_SCALE = "SET_SCALE";
const RESET_VIEW = "RESET_VIEW";
const SHOW_COLUMN = "SHOW_COLUMN";
const HIDE_COLUMN = "HIDE_COLUMN";
const REORDER_COLUMNS = "REORDER_COLUMNS";
const RESIZE_COLUMN = "RESIZE_COLUMN";
const RESET_COLUMNS = "RESET_COLUMNS";
const SAVE_COLUMN_PRESET = "SAVE_COLUMN_PRESET";
const LOAD_COLUMN_PRESET = "LOAD_COLUMN_PRESET";
const ENTER_FULLSCREEN = "ENTER_FULLSCREEN";
const EXIT_FULLSCREEN = "EXIT_FULLSCREEN";
const TOGGLE_FULLSCREEN = "TOGGLE_FULLSCREEN";
const ENTER_FOCUS_MODE = "ENTER_FOCUS_MODE";
const EXIT_FOCUS_MODE = "EXIT_FOCUS_MODE";
const ENTER_PRESENTATION_MODE = "ENTER_PRESENTATION_MODE";

function viewReducer(state, action){
  switch(action.type){
    case SET_VIEW:
      return { ...state, view: action.payload };
    case SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };
    case TOGGLE_VIEW:
      const views = ['list', 'grid', 'kanban', 'calendar', 'timeline'];
      const currentIndex = views.indexOf(state.view);
      return { ...state, view: views[(currentIndex + 1) % views.length] };
    case SET_DENSITY:
      return { ...state, density: action.payload };
    case SET_ZOOM:
      return { ...state, zoom: Math.max(0.25, Math.min(3, action.payload)) };
    case SET_SCALE:
      return { ...state, scale: Math.max(0.5, Math.min(2, action.payload)) };
    case RESET_VIEW:
      return { 
        ...state, 
        view: 'list', 
        viewMode: 'default',
        density: 'comfortable', 
        zoom: 1, 
        scale: 1 
      };
    case SHOW_COLUMN:
      return { 
        ...state, 
        visibleColumns: [...new Set([...state.visibleColumns, action.payload])] 
      };
    case HIDE_COLUMN:
      return { 
        ...state, 
        visibleColumns: state.visibleColumns.filter(c => c !== action.payload) 
      };
    case REORDER_COLUMNS:
      return { ...state, columnOrder: action.payload };
    case RESIZE_COLUMN:
      return { 
        ...state, 
        columnWidths: { ...state.columnWidths, [action.payload.key]: action.payload.width } 
      };
    case RESET_COLUMNS:
      return { 
        ...state, 
        visibleColumns: state.defaultColumns,
        columnOrder: state.defaultColumns,
        columnWidths: {} 
      };
    case SAVE_COLUMN_PRESET:
      return { 
        ...state, 
        columnPresets: [...state.columnPresets, { 
          ...action.payload, 
          id: crypto.randomUUID(),
          columns: [...state.visibleColumns],
          order: [...state.columnOrder],
          widths: { ...state.columnWidths }
        }] 
      };
    case LOAD_COLUMN_PRESET:
      const preset = state.columnPresets.find(p => p.id === action.payload);
      if (!preset) return state;
      return {
        ...state,
        visibleColumns: [...preset.columns],
        columnOrder: [...preset.order],
        columnWidths: { ...preset.widths }
      };
    case ENTER_FULLSCREEN:
      return { ...state, isFullscreen: true };
    case EXIT_FULLSCREEN:
      return { ...state, isFullscreen: false };
    case TOGGLE_FULLSCREEN:
      return { ...state, isFullscreen: !state.isFullscreen };
    case ENTER_FOCUS_MODE:
      return { ...state, isFocusMode: true, isFullscreen: true };
    case EXIT_FOCUS_MODE:
      return { ...state, isFocusMode: false };
    case ENTER_PRESENTATION_MODE:
      return { ...state, isPresentationMode: true, isFullscreen: true };
    default:
      return state;
  }
}

function ViewProvider({ children, defaultColumns = [] }){
  const [view, dispatch] = useReducer(viewReducer, {
    view: 'list',
    viewMode: 'default',
    density: 'comfortable',
    zoom: 1,
    scale: 1,
    visibleColumns: defaultColumns,
    defaultColumns: defaultColumns,
    columnOrder: defaultColumns,
    columnWidths: {},
    columnPresets: [],
    isFullscreen: false,
    isFocusMode: false,
    isPresentationMode: false
  });

  const setView = useCallback((viewType) => {
    dispatch({ type: SET_VIEW, payload: viewType });
  }, []);

  const setViewMode = useCallback((mode) => {
    dispatch({ type: SET_VIEW_MODE, payload: mode });
  }, []);

  const toggleView = useCallback(() => {
    dispatch({ type: TOGGLE_VIEW });
  }, []);

  const setDensity = useCallback((density) => {
    dispatch({ type: SET_DENSITY, payload: density });
  }, []);

  const setZoom = useCallback((zoom) => {
    dispatch({ type: SET_ZOOM, payload: zoom });
  }, []);

  const setScale = useCallback((scale) => {
    dispatch({ type: SET_SCALE, payload: scale });
  }, []);

  const resetView = useCallback(() => {
    dispatch({ type: RESET_VIEW });
  }, []);

  const showColumn = useCallback((column) => {
    dispatch({ type: SHOW_COLUMN, payload: column });
  }, []);

  const hideColumn = useCallback((column) => {
    dispatch({ type: HIDE_COLUMN, payload: column });
  }, []);

  const reorderColumns = useCallback((order) => {
    dispatch({ type: REORDER_COLUMNS, payload: order });
  }, []);

  const resizeColumn = useCallback((key, width) => {
    dispatch({ type: RESIZE_COLUMN, payload: { key, width } });
  }, []);

  const resetColumns = useCallback(() => {
    dispatch({ type: RESET_COLUMNS });
  }, []);

  const saveColumnPreset = useCallback((name) => {
    dispatch({ type: SAVE_COLUMN_PRESET, payload: { name } });
  }, []);

  const loadColumnPreset = useCallback((id) => {
    dispatch({ type: LOAD_COLUMN_PRESET, payload: id });
  }, []);

  const enterFullscreen = useCallback(() => {
    dispatch({ type: ENTER_FULLSCREEN });
  }, []);

  const exitFullscreen = useCallback(() => {
    dispatch({ type: EXIT_FULLSCREEN });
  }, []);

  const toggleFullscreen = useCallback(() => {
    dispatch({ type: TOGGLE_FULLSCREEN });
  }, []);

  const enterFocusMode = useCallback(() => {
    dispatch({ type: ENTER_FOCUS_MODE });
  }, []);

  const exitFocusMode = useCallback(() => {
    dispatch({ type: EXIT_FOCUS_MODE });
  }, []);

  const enterPresentationMode = useCallback(() => {
    dispatch({ type: ENTER_PRESENTATION_MODE });
  }, []);

  // UI state outside reducer
  const [data, setData] = useState([]);

  // Computed visible columns
  const visibleColumnData = useMemo(() => {
    return view.columnOrder.filter(col => view.visibleColumns.includes(col));
  }, [view.columnOrder, view.visibleColumns]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('viewState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.view) dispatch({ type: SET_VIEW, payload: parsed.view });
        if (parsed.density) dispatch({ type: SET_DENSITY, payload: parsed.density });
        if (parsed.zoom) dispatch({ type: SET_ZOOM, payload: parsed.zoom });
        if (parsed.visibleColumns) parsed.visibleColumns.forEach(col => dispatch({ type: SHOW_COLUMN, payload: col }));
        if (parsed.columnOrder) dispatch({ type: REORDER_COLUMNS, payload: parsed.columnOrder });
        if (parsed.columnWidths) Object.entries(parsed.columnWidths).forEach(([key, width]) => {
          dispatch({ type: RESIZE_COLUMN, payload: { key, width } });
        });
      } catch (e) {
        console.error('Failed to load view state', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('viewState', JSON.stringify({
      view: view.view,
      density: view.density,
      zoom: view.zoom,
      visibleColumns: view.visibleColumns,
      columnOrder: view.columnOrder,
      columnWidths: view.columnWidths
    }));
  }, [view.view, view.density, view.zoom, view.visibleColumns, view.columnOrder, view.columnWidths]);

  const value = {
    view,
    data,
    setData,
    visibleColumnData,
    setView,
    setViewMode,
    toggleView,
    setDensity,
    setZoom,
    setScale,
    resetView,
    showColumn,
    hideColumn,
    reorderColumns,
    resizeColumn,
    resetColumns,
    saveColumnPreset,
    loadColumnPreset,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    enterFocusMode,
    exitFocusMode,
    enterPresentationMode
  };

  return (
    <ViewContext.Provider value={value}>
      {children}
    </ViewContext.Provider>
  );
}

function useView(){
  const context = useContext(ViewContext);
  if (context === null) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
}

export { ViewProvider, useView };



import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const FormContext = createContext(null);

const SET_FORM_FIELD = "SET_FORM_FIELD";
const SET_FORM_DATA = "SET_FORM_DATA";
const RESET_FORM = "RESET_FORM";
const CLEAR_FORM = "CLEAR_FORM";
const SUBMIT_FORM = "SUBMIT_FORM";
const SUBMIT_FORM_START = "SUBMIT_FORM_START";
const SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS";
const SUBMIT_FORM_ERROR = "SUBMIT_FORM_ERROR";
const VALIDATE_FORM = "VALIDATE_FORM";
const SET_FIELD_ERROR = "SET_FIELD_ERROR";
const CLEAR_FIELD_ERROR = "CLEAR_FIELD_ERROR";
const SET_FIELD_TOUCHED = "SET_FIELD_TOUCHED";
const SET_FIELD_DIRTY = "SET_FIELD_DIRTY";
const SET_FORM_DIRTY = "SET_FORM_DIRTY";
const SET_FORM_PRISTINE = "SET_FORM_PRISTINE";
const SET_FORM_VALID = "SET_FORM_VALID";
const SET_FORM_INVALID = "SET_FORM_INVALID";
const SET_FORM_SUBMITTING = "SET_FORM_SUBMITTING";
const SET_FORM_SUBMITTED = "SET_FORM_SUBMITTED";
const ADD_FORM_ARRAY_ITEM = "ADD_FORM_ARRAY_ITEM";
const REMOVE_FORM_ARRAY_ITEM = "REMOVE_FORM_ARRAY_ITEM";
const MOVE_FORM_ARRAY_ITEM = "MOVE_FORM_ARRAY_ITEM";
const SET_FORM_STEP = "SET_FORM_STEP";
const NEXT_FORM_STEP = "NEXT_FORM_STEP";
const PREVIOUS_FORM_STEP = "PREVIOUS_FORM_STEP";
const GOTO_FORM_STEP = "GOTO_FORM_STEP";
const COMPLETE_FORM_STEP = "COMPLETE_FORM_STEP";
const SET_FORM_STEP_VALID = "SET_FORM_STEP_VALID";
const SET_FORM_STEP_INVALID = "SET_FORM_STEP_INVALID";

function formReducer(state, action){
  switch(action.type){
    case SET_FORM_FIELD:
      return { 
        ...state, 
        values: { ...state.values, [action.payload.name]: action.payload.value },
        touched: { ...state.touched, [action.payload.name]: true },
        dirty: { ...state.douched, [action.payload.name]: true },
        isDirty: true,
        isPristine: false
      };
    case SET_FORM_DATA:
      return { 
        ...state, 
        values: { ...state.values, ...action.payload },
        isDirty: true,
        isPristine: false
      };
    case RESET_FORM:
      return { 
        ...state, 
        values: state.initialValues,
        errors: {},
        touched: {},
        dirty: {},
        isDirty: false,
        isPristine: true,
        isValid: true,
        isInvalid: false,
        isSubmitted: false
      };
    case CLEAR_FORM:
      return { 
        ...state, 
        values: {},
        errors: {},
        touched: {},
        dirty: {},
        isDirty: false,
        isPristine: true,
        isValid: true,
        isInvalid: false
      };
    case SUBMIT_FORM:
      return { ...state, isSubmitting: true, submitError: null };
    case SUBMIT_FORM_START:
      return { ...state, isSubmitting: true, submitError: null };
    case SUBMIT_FORM_SUCCESS:
      return { 
        ...state, 
        isSubmitting: false, 
        isSubmitted: true,
        submitError: null,
        values: action.payload || state.values
      };
    case SUBMIT_FORM_ERROR:
      return { 
        ...state, 
        isSubmitting: false, 
        submitError: action.payload,
        isSubmitted: false
      };
    case VALIDATE_FORM:
      return { ...state, errors: action.payload.errors, isValid: action.payload.isValid, isInvalid: !action.payload.isValid };
    case SET_FIELD_ERROR:
      return { 
        ...state, 
        errors: { ...state.errors, [action.payload.name]: action.payload.error },
        isValid: false,
        isInvalid: true
      };
    case CLEAR_FIELD_ERROR:
      const { [action.payload]: _, ...remainingErrors } = state.errors;
      const hasErrors = Object.keys(remainingErrors).length > 0;
      return { 
        ...state, 
        errors: remainingErrors,
        isValid: !hasErrors,
        isInvalid: hasErrors
      };
    case SET_FIELD_TOUCHED:
      return { ...state, touched: { ...state.touched, [action.payload]: true } };
    case SET_FIELD_DIRTY:
      return { ...state, dirty: { ...state.dirty, [action.payload]: true }, isDirty: true, isPristine: false };
    case SET_FORM_DIRTY:
      return { ...state, isDirty: true, isPristine: false };
    case SET_FORM_PRISTINE:
      return { ...state, isDirty: false, isPristine: true };
    case SET_FORM_VALID:
      return { ...state, isValid: true, isInvalid: false };
    case SET_FORM_INVALID:
      return { ...state, isValid: false, isInvalid: true };
    case SET_FORM_SUBMITTING:
      return { ...state, isSubmitting: action.payload };
    case SET_FORM_SUBMITTED:
      return { ...state, isSubmitted: action.payload };
    case ADD_FORM_ARRAY_ITEM:
      return { 
        ...state, 
        values: { 
          ...state.values, 
          [action.payload.name]: [...(state.values[action.payload.name] || []), action.payload.value] 
        },
        isDirty: true,
        isPristine: false
      };
    case REMOVE_FORM_ARRAY_ITEM:
      return { 
        ...state, 
        values: { 
          ...state.values, 
          [action.payload.name]: (state.values[action.payload.name] || []).filter((_, i) => i !== action.payload.index) 
        },
        isDirty: true,
        isPristine: false
      };
    case MOVE_FORM_ARRAY_ITEM:
      const arr = [...(state.values[action.payload.name] || [])];
      const [moved] = arr.splice(action.payload.from, 1);
      arr.splice(action.payload.to, 0, moved);
      return { 
        ...state, 
        values: { ...state.values, [action.payload.name]: arr },
        isDirty: true,
        isPristine: false
      };
    case SET_FORM_STEP:
      return { ...state, currentStep: action.payload };
    case NEXT_FORM_STEP:
      return { ...state, currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1) };
    case PREVIOUS_FORM_STEP:
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) };
    case GOTO_FORM_STEP:
      return { ...state, currentStep: Math.max(0, Math.min(action.payload, state.totalSteps - 1)) };
    case COMPLETE_FORM_STEP:
      return { 
        ...state, 
        completedSteps: [...new Set([...state.completedSteps, action.payload])] 
      };
    case SET_FORM_STEP_VALID:
      return { 
        ...state, 
        stepValidity: { ...state.stepValidity, [action.payload]: true } 
      };
    case SET_FORM_STEP_INVALID:
      return { 
        ...state, 
        stepValidity: { ...state.stepValidity, [action.payload]: false } 
      };
    default:
      return state;
  }
}

function FormProvider({ children, initialValues = {}, totalSteps = 1 }){
  const [form, dispatch] = useReducer(formReducer, {
    values: initialValues,
    initialValues: initialValues,
    errors: {},
    touched: {},
    dirty: {},
    isDirty: false,
    isPristine: true,
    isValid: true,
    isInvalid: false,
    isSubmitting: false,
    isSubmitted: false,
    submitError: null,
    currentStep: 0,
    totalSteps: totalSteps,
    completedSteps: [],
    stepValidity: {}
  });

  const setFormField = useCallback((name, value) => {
    dispatch({ type: SET_FORM_FIELD, payload: { name, value } });
  }, []);

  const setFormData = useCallback((data) => {
    dispatch({ type: SET_FORM_DATA, payload: data });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: RESET_FORM });
  }, []);

  const clearForm = useCallback(() => {
    dispatch({ type: CLEAR_FORM });
  }, []);

  const submitForm = useCallback(() => {
    dispatch({ type: SUBMIT_FORM });
  }, []);

  const submitFormStart = useCallback(() => {
    dispatch({ type: SUBMIT_FORM_START });
  }, []);

  const submitFormSuccess = useCallback((data) => {
    dispatch({ type: SUBMIT_FORM_SUCCESS, payload: data });
  }, []);

  const submitFormError = useCallback((error) => {
    dispatch({ type: SUBMIT_FORM_ERROR, payload: error });
  }, []);

  const validateForm = useCallback((errors, isValid) => {
    dispatch({ type: VALIDATE_FORM, payload: { errors, isValid } });
  }, []);

  const setFieldError = useCallback((name, error) => {
    dispatch({ type: SET_FIELD_ERROR, payload: { name, error } });
  }, []);

  const clearFieldError = useCallback((name) => {
    dispatch({ type: CLEAR_FIELD_ERROR, payload: name });
  }, []);

  const setFieldTouched = useCallback((name) => {
    dispatch({ type: SET_FIELD_TOUCHED, payload: name });
  }, []);

  const setFieldDirty = useCallback((name) => {
    dispatch({ type: SET_FIELD_DIRTY, payload: name });
  }, []);

  const setFormDirty = useCallback(() => {
    dispatch({ type: SET_FORM_DIRTY });
  }, []);

  const setFormPristine = useCallback(() => {
    dispatch({ type: SET_FORM_PRISTINE });
  }, []);

  const setFormValid = useCallback(() => {
    dispatch({ type: SET_FORM_VALID });
  }, []);

  const setFormInvalid = useCallback(() => {
    dispatch({ type: SET_FORM_INVALID });
  }, []);

  const setFormSubmitting = useCallback((submitting) => {
    dispatch({ type: SET_FORM_SUBMITTING, payload: submitting });
  }, []);

  const setFormSubmitted = useCallback((submitted) => {
    dispatch({ type: SET_FORM_SUBMITTED, payload: submitted });
  }, []);

  const addFormArrayItem = useCallback((name, value) => {
    dispatch({ type: ADD_FORM_ARRAY_ITEM, payload: { name, value } });
  }, []);

  const removeFormArrayItem = useCallback((name, index) => {
    dispatch({ type: REMOVE_FORM_ARRAY_ITEM, payload: { name, index } });
  }, []);

  const moveFormArrayItem = useCallback((name, from, to) => {
    dispatch({ type: MOVE_FORM_ARRAY_ITEM, payload: { name, from, to } });
  }, []);

  const setFormStep = useCallback((step) => {
    dispatch({ type: SET_FORM_STEP, payload: step });
  }, []);

  const nextFormStep = useCallback(() => {
    dispatch({ type: NEXT_FORM_STEP });
  }, []);

  const previousFormStep = useCallback(() => {
    dispatch({ type: PREVIOUS_FORM_STEP });
  }, []);

  const gotoFormStep = useCallback((step) => {
    dispatch({ type: GOTO_FORM_STEP, payload: step });
  }, []);

  const completeFormStep = useCallback((step) => {
    dispatch({ type: COMPLETE_FORM_STEP, payload: step });
  }, []);

  const setFormStepValid = useCallback((step) => {
    dispatch({ type: SET_FORM_STEP_VALID, payload: step });
  }, []);

  const setFormStepInvalid = useCallback((step) => {
    dispatch({ type: SET_FORM_STEP_INVALID, payload: step });
  }, []);

  // UI state outside reducer
  const [isFormPanelOpen, setIsFormPanelOpen] = useState(false);

  // Computed
  const fieldValues = useMemo(() => form.values, [form.values]);
  const fieldErrors = useMemo(() => form.errors, [form.errors]);
  const touchedFields = useMemo(() => form.touched, [form.touched]);
  const dirtyFields = useMemo(() => form.dirty, [form.dirty]);
  const isStepValid = useCallback((step) => form.stepValidity[step] !== false, [form.stepValidity]);
  const canGoNextStep = useMemo(() => 
    form.currentStep < form.totalSteps - 1 && isStepValid(form.currentStep), 
    [form.currentStep, form.totalSteps, form.stepValidity]
  );
  const canGoPreviousStep = useMemo(() => form.currentStep > 0, [form.currentStep]);
  const progress = useMemo(() => 
    ((form.completedSteps.length) / form.totalSteps) * 100, 
    [form.completedSteps, form.totalSteps]
  );

  // Load from localStorage (auto-save draft)
  useEffect(() => {
    const saved = localStorage.getItem('formDraft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: SET_FORM_DATA, payload: parsed });
      } catch (e) {
        console.error('Failed to load form draft', e);
      }
    }
  }, []);

  // Save draft
  useEffect(() => {
    if (form.isDirty && !form.isSubmitted) {
      localStorage.setItem('formDraft', JSON.stringify(form.values));
    }
  }, [form.values, form.isDirty, form.isSubmitted]);

  // Clear draft on successful submit
  useEffect(() => {
    if (form.isSubmitted) {
      localStorage.removeItem('formDraft');
    }
  }, [form.isSubmitted]);

  const value = {
    form,
    fieldValues,
    fieldErrors,
    touchedFields,
    dirtyFields,
    isStepValid,
    canGoNextStep,
    canGoPreviousStep,
    progress,
    isFormPanelOpen,
    setIsFormPanelOpen,
    setFormField,
    setFormData,
    resetForm,
    clearForm,
    submitForm,
    submitFormStart,
    submitFormSuccess,
    submitFormError,
    validateForm,
    setFieldError,
    clearFieldError,
    setFieldTouched,
    setFieldDirty,
    setFormDirty,
    setFormPristine,
    setFormValid,
    setFormInvalid,
    setFormSubmitting,
    setFormSubmitted,
    addFormArrayItem,
    removeFormArrayItem,
    moveFormArrayItem,
    setFormStep,
    nextFormStep,
    previousFormStep,
    gotoFormStep,
    completeFormStep,
    setFormStepValid,
    setFormStepInvalid
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

function useForm(){
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}

export { FormProvider, useForm };




import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const ModalContext = createContext(null);

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const SET_MODAL_DATA = "SET_MODAL_DATA";
const CLEAR_MODAL_DATA = "CLEAR_MODAL_DATA";
const SET_MODAL_SIZE = "SET_MODAL_SIZE";
const SET_MODAL_POSITION = "SET_MODAL_POSITION";
const SET_MODAL_BACKDROP = "SET_MODAL_BACKDROP";
const OPEN_DIALOG = "OPEN_DIALOG";
const CLOSE_DIALOG = "CLOSE_DIALOG";
const CONFIRM_DIALOG = "CONFIRM_DIALOG";
const CANCEL_DIALOG = "CANCEL_DIALOG";
const SET_DIALOG_RESULT = "SET_DIALOG_RESULT";
const OPEN_DRAWER = "OPEN_DRAWER";
const CLOSE_DRAWER = "CLOSE_DRAWER";
const TOGGLE_DRAWER = "TOGGLE_DRAWER";
const SET_DRAWER_SIZE = "SET_DRAWER_SIZE";
const SET_DRAWER_SIDE = "SET_DRAWER_SIDE";
const SHOW_POPOVER = "SHOW_POPOVER";
const HIDE_POPOVER = "HIDE_POPOVER";
const TOGGLE_POPOVER = "TOGGLE_POPOVER";
const SET_POPOVER_ANCHOR = "SET_POPOVER_ANCHOR";
const ADD_TOAST = "ADD_TOAST";
const REMOVE_TOAST = "REMOVE_TOAST";
const CLEAR_TOASTS = "CLEAR_TOASTS";
const UPDATE_TOAST = "UPDATE_TOAST";
const EXPIRE_TOAST = "EXPIRE_TOAST";
const EXPAND_BOTTOM_SHEET = "EXPAND_BOTTOM_SHEET";
const COLLAPSE_BOTTOM_SHEET = "COLLAPSE_BOTTOM_SHEET";
const CLOSE_BOTTOM_SHEET = "CLOSE_BOTTOM_SHEET";

function modalReducer(state, action){
  switch(action.type){
    case OPEN_MODAL:
      return { 
        ...state, 
        modals: { ...state.modals, [action.payload.id]: { 
          isOpen: true, 
          data: action.payload.data || null,
          size: action.payload.size || 'md',
          position: action.payload.position || 'center',
          backdrop: action.payload.backdrop || 'clickable'
        }} 
      };
    case CLOSE_MODAL:
      const { [action.payload]: __, ...remainingModals } = state.modals;
      return { ...state, modals: remainingModals };
    case TOGGLE_MODAL:
      const modal = state.modals[action.payload.id];
      if (modal?.isOpen) {
        const { [action.payload.id]: ___, ...rest } = state.modals;
        return { ...state, modals: rest };
      }
      return { 
        ...state, 
        modals: { ...state.modals, [action.payload.id]: { 
          isOpen: true, 
          data: action.payload.data || null,
          size: action.payload.size || 'md',
          position: action.payload.position || 'center',
          backdrop: action.payload.backdrop || 'clickable'
        }} 
      };
    case SET_MODAL_DATA:
      return { 
        ...state, 
        modals: { 
          ...state.modals, 
          [action.payload.id]: { ...state.modals[action.payload.id], data: action.payload.data } 
        } 
      };
    case CLEAR_MODAL_DATA:
      return { 
        ...state, 
        modals: { 
          ...state.modals, 
          [action.payload]: { ...state.modals[action.payload], data: null } 
        } 
      };
    case SET_MODAL_SIZE:
      return { 
        ...state, 
        modals: { 
          ...state.modals, 
          [action.payload.id]: { ...state.modals[action.payload.id], size: action.payload.size } 
        } 
      };
    case SET_MODAL_POSITION:
      return { 
        ...state, 
        modals: { 
          ...state.modals, 
          [action.payload.id]: { ...state.modals[action.payload.id], position: action.payload.position } 
        } 
      };
    case SET_MODAL_BACKDROP:
      return { 
        ...state, 
        modals: { 
          ...state.modals, 
          [action.payload.id]: { ...state.modals[action.payload.id], backdrop: action.payload.backdrop } 
        } 
      };
    case OPEN_DIALOG:
      return { 
        ...state, 
        dialogs: { ...state.dialogs, [action.payload.id]: { 
          isOpen: true, 
          type: action.payload.type || 'confirm',
          title: action.payload.title,
          message: action.payload.message,
          confirmText: action.payload.confirmText || 'Confirm',
          cancelText: action.payload.cancelText || 'Cancel',
          result: null
        }} 
      };
    case CLOSE_DIALOG:
      const { [action.payload]: __d, ...remainingDialogs } = state.dialogs;
      return { ...state, dialogs: remainingDialogs };
    case CONFIRM_DIALOG:
      return { 
        ...state, 
        dialogs: { 
          ...state.dialogs, 
          [action.payload]: { ...state.dialogs[action.payload], result: 'confirmed', isOpen: false } 
        } 
      };
    case CANCEL_DIALOG:
      return { 
        ...state, 
        dialogs: { 
          ...state.dialogs, 
          [action.payload]: { ...state.dialogs[action.payload], result: 'cancelled', isOpen: false } 
        } 
      };
    case SET_DIALOG_RESULT:
      return { 
        ...state, 
        dialogs: { 
          ...state.dialogs, 
          [action.payload.id]: { ...state.dialogs[action.payload.id], result: action.payload.result } 
        } 
      };
    case OPEN_DRAWER:
      return { 
        ...state, 
        drawers: { ...state.drawers, [action.payload.id]: { 
          isOpen: true, 
          size: action.payload.size || 'md',
          side: action.payload.side || 'right'
        }} 
      };
    case CLOSE_DRAWER:
      const { [action.payload]: __dr, ...remainingDrawers } = state.drawers;
      return { ...state, drawers: remainingDrawers };
    case TOGGLE_DRAWER:
      const drawer = state.drawers[action.payload.id];
      if (drawer?.isOpen) {
        const { [action.payload.id]: ___, ...rest } = state.drawers;
        return { ...state, drawers: rest };
      }
      return { 
        ...state, 
        drawers: { ...state.drawers, [action.payload.id]: { 
          isOpen: true, 
          size: action.payload.size || 'md',
          side: action.payload.side || 'right'
        }} 
      };
    case SET_DRAWER_SIZE:
      return { 
        ...state, 
        drawers: { 
          ...state.drawers, 
          [action.payload.id]: { ...state.drawers[action.payload.id], size: action.payload.size } 
        } 
      };
    case SET_DRAWER_SIDE:
      return { 
        ...state, 
        drawers: { 
          ...state.drawers, 
          [action.payload.id]: { ...state.drawers[action.payload.id], side: action.payload.side } 
        } 
      };
    case SHOW_POPOVER:
      return { 
        ...state, 
        popovers: { ...state.popovers, [action.payload.id]: { 
          isOpen: true, 
          anchor: action.payload.anchor || null 
        }} 
      };
    case HIDE_POPOVER:
      const { [action.payload]: __p, ...remainingPopovers } = state.popovers;
      return { ...state, popovers: remainingPopovers };
    case TOGGLE_POPOVER:
      const popover = state.popovers[action.payload.id];
      if (popover?.isOpen) {
        const { [action.payload.id]: ___, ...rest } = state.popovers;
        return { ...state, popovers: rest };
      }
      return { 
        ...state, 
        popovers: { ...state.popovers, [action.payload.id]: { 
          isOpen: true, 
          anchor: action.payload.anchor || null 
        }} 
      };
    case SET_POPOVER_ANCHOR:
      return { 
        ...state, 
        popovers: { 
          ...state.popovers, 
          [action.payload.id]: { ...state.popovers[action.payload.id], anchor: action.payload.anchor } 
        } 
      };
    case ADD_TOAST:
      return { 
        ...state, 
        toasts: [...state.toasts, { 
          ...action.payload, 
          id: action.payload.id || crypto.randomUUID(),
          createdAt: Date.now()
        }] 
      };
    case REMOVE_TOAST:
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    case CLEAR_TOASTS:
      return { ...state, toasts: [] };
    case UPDATE_TOAST:
      return { 
        ...state, 
        toasts: state.toasts.map(t => 
          t.id === action.payload.id ? { ...t, ...action.payload.data } : t
        ) 
      };
    case EXPIRE_TOAST:
      return { 
        ...state, 
        toasts: state.toasts.map(t => 
          t.id === action.payload ? { ...t, isExpired: true } : t
        ) 
      };
    case EXPAND_BOTTOM_SHEET:
      return { 
        ...state, 
        bottomSheets: { ...state.bottomSheets, [action.payload]: { isOpen: true, isExpanded: true } } 
      };
    case COLLAPSE_BOTTOM_SHEET:
      return { 
        ...state, 
        bottomSheets: { 
          ...state.bottomSheets, 
          [action.payload]: { ...state.bottomSheets[action.payload], isExpanded: false } 
        } 
      };
    case CLOSE_BOTTOM_SHEET:
      const { [action.payload]: __b, ...remainingSheets } = state.bottomSheets;
      return { ...state, bottomSheets: remainingSheets };
    default:
      return state;
  }
}

function ModalProvider({ children }){
  const [overlay, dispatch] = useReducer(modalReducer, {
    modals: {},
    dialogs: {},
    drawers: {},
    popovers: {},
    toasts: [],
    bottomSheets: {}
  });

  // Modal actions
  const openModal = useCallback((id, data, options = {}) => {
    dispatch({ type: OPEN_MODAL, payload: { id, data, ...options } });
  }, []);

  const closeModal = useCallback((id) => {
    dispatch({ type: CLOSE_MODAL, payload: id });
  }, []);

  const toggleModal = useCallback((id, data, options = {}) => {
    dispatch({ type: TOGGLE_MODAL, payload: { id, data, ...options } });
  }, []);

  const setModalData = useCallback((id, data) => {
    dispatch({ type: SET_MODAL_DATA, payload: { id, data } });
  }, []);

  const clearModalData = useCallback((id) => {
    dispatch({ type: CLEAR_MODAL_DATA, payload: id });
  }, []);

  const setModalSize = useCallback((id, size) => {
    dispatch({ type: SET_MODAL_SIZE, payload: { id, size } });
  }, []);

  const setModalPosition = useCallback((id, position) => {
    dispatch({ type: SET_MODAL_POSITION, payload: { id, position } });
  }, []);

  const setModalBackdrop = useCallback((id, backdrop) => {
    dispatch({ type: SET_MODAL_BACKDROP, payload: { id, backdrop } });
  }, []);

  // Dialog actions
  const openDialog = useCallback((id, options = {}) => {
    dispatch({ type: OPEN_DIALOG, payload: { id, ...options } });
  }, []);

  const closeDialog = useCallback((id) => {
    dispatch({ type: CLOSE_DIALOG, payload: id });
  }, []);

  const confirmDialog = useCallback((id) => {
    dispatch({ type: CONFIRM_DIALOG, payload: id });
  }, []);

  const cancelDialog = useCallback((id) => {
    dispatch({ type: CANCEL_DIALOG, payload: id });
  }, []);

  const setDialogResult = useCallback((id, result) => {
    dispatch({ type: SET_DIALOG_RESULT, payload: { id, result } });
  }, []);

  // Drawer actions
  const openDrawer = useCallback((id, options = {}) => {
    dispatch({ type: OPEN_DRAWER, payload: { id, ...options } });
  }, []);

  const closeDrawer = useCallback((id) => {
    dispatch({ type: CLOSE_DRAWER, payload: id });
  }, []);

  const toggleDrawer = useCallback((id, options = {}) => {
    dispatch({ type: TOGGLE_DRAWER, payload: { id, ...options } });
  }, []);

  const setDrawerSize = useCallback((id, size) => {
    dispatch({ type: SET_DRAWER_SIZE, payload: { id, size } });
  }, []);

  const setDrawerSide = useCallback((id, side) => {
    dispatch({ type: SET_DRAWER_SIDE, payload: { id, side } });
  }, []);

  // Popover actions
  const showPopover = useCallback((id, anchor) => {
    dispatch({ type: SHOW_POPOVER, payload: { id, anchor } });
  }, []);

  const hidePopover = useCallback((id) => {
    dispatch({ type: HIDE_POPOVER, payload: id });
  }, []);

  const togglePopover = useCallback((id, anchor) => {
    dispatch({ type: TOGGLE_POPOVER, payload: { id, anchor } });
  }, []);

  const setPopoverAnchor = useCallback((id, anchor) => {
    dispatch({ type: SET_POPOVER_ANCHOR, payload: { id, anchor } });
  }, []);

  // Toast actions
  const addToast = useCallback((toast) => {
    dispatch({ type: ADD_TOAST, payload: toast });
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: REMOVE_TOAST, payload: id });
  }, []);

  const clearToasts = useCallback(() => {
    dispatch({ type: CLEAR_TOASTS });
  }, []);

  const updateToast = useCallback((id, data) => {
    dispatch({ type: UPDATE_TOAST, payload: { id, data } });
  }, []);

  const expireToast = useCallback((id) => {
    dispatch({ type: EXPIRE_TOAST, payload: id });
  }, []);

  // Bottom sheet actions
  const expandBottomSheet = useCallback((id) => {
    dispatch({ type: EXPAND_BOTTOM_SHEET, payload: id });
  }, []);

  const collapseBottomSheet = useCallback((id) => {
    dispatch({ type: COLLAPSE_BOTTOM_SHEET, payload: id });
  }, []);

  const closeBottomSheet = useCallback((id) => {
    dispatch({ type: CLOSE_BOTTOM_SHEET, payload: id });
  }, []);

  // Computed
  const activeModalCount = useMemo(() => 
    Object.values(overlay.modals).filter(m => m.isOpen).length, 
    [overlay.modals]
  );
  const activeDialogCount = useMemo(() => 
    Object.values(overlay.dialogs).filter(d => d.isOpen).length, 
    [overlay.dialogs]
  );
  const activeDrawerCount = useMemo(() => 
    Object.values(overlay.drawers).filter(d => d.isOpen).length, 
    [overlay.drawers]
  );
  const activeToastCount = useMemo(() => overlay.toasts.length, [overlay.toasts]);
  const hasOpenOverlay = useMemo(() => 
    activeModalCount > 0 || activeDialogCount > 0 || activeDrawerCount > 0, 
    [activeModalCount, activeDialogCount, activeDrawerCount]
  );

  // Auto-remove expired toasts
  useEffect(() => {
    const expired = overlay.toasts.filter(t => t.isExpired);
    expired.forEach(t => {
      setTimeout(() => removeToast(t.id), 300);
    });
  }, [overlay.toasts]);

  // Auto-expire toasts with duration
  useEffect(() => {
    overlay.toasts.forEach(t => {
      if (t.duration && !t.isExpired && !t.expiryTimer) {
        const timer = setTimeout(() => expireToast(t.id), t.duration);
        updateToast(t.id, { expiryTimer: timer });
      }
    });
  }, [overlay.toasts]);

  const value = {
    overlay,
    activeModalCount,
    activeDialogCount,
    activeDrawerCount,
    activeToastCount,
    hasOpenOverlay,
    openModal,
    closeModal,
    toggleModal,
    setModalData,
    clearModalData,
    setModalSize,
    setModalPosition,
    setModalBackdrop,
    openDialog,
    closeDialog,
    confirmDialog,
    cancelDialog,
    setDialogResult,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    setDrawerSize,
    setDrawerSide,
    showPopover,
    hidePopover,
    togglePopover,
    setPopoverAnchor,
    addToast,
    removeToast,
    clearToasts,
    updateToast,
    expireToast,
    expandBottomSheet,
    collapseBottomSheet,
    closeBottomSheet
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal(){
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export { ModalProvider, useModal };









import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const DragContext = createContext(null);

const DRAG_START = "DRAG_START";
const DRAG_OVER = "DRAG_OVER";
const DRAG_ENTER = "DRAG_ENTER";
const DRAG_LEAVE = "DRAG_LEAVE";
const DRAG_END = "DRAG_END";
const DROP = "DROP";
const SET_DRAG_DATA = "SET_DRAG_DATA";
const CLEAR_DRAG_DATA = "CLEAR_DRAG_DATA";
const SET_DROP_TARGET = "SET_DROP_TARGET";
const CLEAR_DROP_TARGET = "CLEAR_DROP_TARGET";
const SET_DRAGGING = "SET_DRAGGING";
const SET_DRAG_PREVIEW = "SET_DRAG_PREVIEW";
const REORDER_ITEMS = "REORDER_ITEMS";
const MOVE_ITEM = "MOVE_ITEM";
const MOVE_ITEM_UP = "MOVE_ITEM_UP";
const MOVE_ITEM_DOWN = "MOVE_ITEM_DOWN";
const MOVE_ITEM_TO_TOP = "MOVE_ITEM_TO_TOP";
const MOVE_ITEM_TO_BOTTOM = "MOVE_ITEM_TO_BOTTOM";
const MOVE_ITEM_TO_POSITION = "MOVE_ITEM_TO_POSITION";
const SWAP_ITEMS = "SWAP_ITEMS";
const INSERT_ITEM_AT = "INSERT_ITEM_AT";
const REMOVE_ITEM_AT = "REMOVE_ITEM_AT";

function dragReducer(state, action){
  switch(action.type){
    case DRAG_START:
      return { 
        ...state, 
        isDragging: true, 
        dragItem: action.payload.item,
        dragSource: action.payload.source,
        dragType: action.payload.type 
      };
    case DRAG_OVER:
      return { ...state, dragOverTarget: action.payload };
    case DRAG_ENTER:
      return { ...state, dragEnterTarget: action.payload };
    case DRAG_LEAVE:
      return { ...state, dragEnterTarget: null };
    case DRAG_END:
      return { 
        ...state, 
        isDragging: false, 
        dragItem: null,
        dragSource: null,
        dragType: null,
        dragOverTarget: null,
        dragEnterTarget: null,
        dropTarget: null 
      };
    case DROP:
      return { 
        ...state, 
        lastDrop: { 
          item: state.dragItem, 
          source: state.dragSource, 
          target: action.payload 
        },
        isDragging: false,
        dragItem: null,
        dragSource: null,
        dragType: null,
        dragOverTarget: null,
        dragEnterTarget: null,
        dropTarget: null
      };
    case SET_DRAG_DATA:
      return { ...state, dragData: action.payload };
    case CLEAR_DRAG_DATA:
      return { ...state, dragData: null };
    case SET_DROP_TARGET:
      return { ...state, dropTarget: action.payload };
    case CLEAR_DROP_TARGET:
      return { ...state, dropTarget: null };
    case SET_DRAGGING:
      return { ...state, isDragging: action.payload };
    case SET_DRAG_PREVIEW:
      return { ...state, dragPreview: action.payload };
    case REORDER_ITEMS:
      const items = [...state.items];
      const [reordered] = items.splice(action.payload.from, 1);
      items.splice(action.payload.to, 0, reordered);
      return { ...state, items };
    case MOVE_ITEM:
      const sourceItems = [...(state.lists[action.payload.sourceList] || [])];
      const targetItems = [...(state.lists[action.payload.targetList] || [])];
      const [moved] = sourceItems.splice(action.payload.fromIndex, 1);
      targetItems.splice(action.payload.toIndex, 0, { ...moved, listId: action.payload.targetList });
      return { 
        ...state, 
        lists: { 
          ...state.lists, 
          [action.payload.sourceList]: sourceItems,
          [action.payload.targetList]: targetItems 
        } 
      };
    case MOVE_ITEM_UP:
      const upItems = [...state.items];
      const upIndex = upItems.findIndex(i => i.id === action.payload);
      if (upIndex > 0) {
        [upItems[upIndex - 1], upItems[upIndex]] = [upItems[upIndex], upItems[upIndex - 1]];
      }
      return { ...state, items: upItems };
    case MOVE_ITEM_DOWN:
      const downItems = [...state.items];
      const downIndex = downItems.findIndex(i => i.id === action.payload);
      if (downIndex < downItems.length - 1) {
        [downItems[downIndex], downItems[downIndex + 1]] = [downItems[downIndex + 1], downItems[downIndex]];
      }
      return { ...state, items: downItems };
    case MOVE_ITEM_TO_TOP:
      const topItems = [...state.items];
      const topIndex = topItems.findIndex(i => i.id === action.payload);
      if (topIndex > 0) {
        const [topItem] = topItems.splice(topIndex, 1);
        topItems.unshift(topItem);
      }
      return { ...state, items: topItems };
    case MOVE_ITEM_TO_BOTTOM:
      const bottomItems = [...state.items];
      const bottomIndex = bottomItems.findIndex(i => i.id === action.payload);
      if (bottomIndex < bottomItems.length - 1) {
        const [bottomItem] = bottomItems.splice(bottomIndex, 1);
        bottomItems.push(bottomItem);
      }
      return { ...state, items: bottomItems };
    case MOVE_ITEM_TO_POSITION:
      const posItems = [...state.items];
      const posIndex = posItems.findIndex(i => i.id === action.payload.id);
      if (posIndex >= 0) {
        const [posItem] = posItems.splice(posIndex, 1);
        posItems.splice(action.payload.position, 0, posItem);
      }
      return { ...state, items: posItems };
    case SWAP_ITEMS:
      const swapItems = [...state.items];
      const idx1 = swapItems.findIndex(i => i.id === action.payload.id1);
      const idx2 = swapItems.findIndex(i => i.id === action.payload.id2);
      if (idx1 >= 0 && idx2 >= 0) {
        [swapItems[idx1], swapItems[idx2]] = [swapItems[idx2], swapItems[idx1]];
      }
      return { ...state, items: swapItems };
    case INSERT_ITEM_AT:
      const insertItems = [...state.items];
      insertItems.splice(action.payload.index, 0, action.payload.item);
      return { ...state, items: insertItems };
    case REMOVE_ITEM_AT:
      const removeItems = [...state.items];
      removeItems.splice(action.payload, 1);
      return { ...state, items: removeItems };
    default:
      return state;
  }
}

function DragProvider({ children, initialItems = [], initialLists = {} }){
  const [drag, dispatch] = useReducer(dragReducer, {
    items: initialItems,
    lists: initialLists,
    isDragging: false,
    dragItem: null,
    dragSource: null,
    dragType: null,
    dragOverTarget: null,
    dragEnterTarget: null,
    dropTarget: null,
    dragData: null,
    dragPreview: null,
    lastDrop: null
  });

  const dragStart = useCallback((item, source, type) => {
    dispatch({ type: DRAG_START, payload: { item, source, type } });
  }, []);

  const dragOver = useCallback((target) => {
    dispatch({ type: DRAG_OVER, payload: target });
  }, []);

  const dragEnter = useCallback((target) => {
    dispatch({ type: DRAG_ENTER, payload: target });
  }, []);

  const dragLeave = useCallback(() => {
    dispatch({ type: DRAG_LEAVE });
  }, []);

  const dragEnd = useCallback(() => {
    dispatch({ type: DRAG_END });
  }, []);

  const drop = useCallback((target) => {
    dispatch({ type: DROP, payload: target });
  }, []);

  const setDragData = useCallback((data) => {
    dispatch({ type: SET_DRAG_DATA, payload: data });
  }, []);

  const clearDragData = useCallback(() => {
    dispatch({ type: CLEAR_DRAG_DATA });
  }, []);

  const setDropTarget = useCallback((target) => {
    dispatch({ type: SET_DROP_TARGET, payload: target });
  }, []);

  const clearDropTarget = useCallback(() => {
    dispatch({ type: CLEAR_DROP_TARGET });
  }, []);

  const setDragging = useCallback((dragging) => {
    dispatch({ type: SET_DRAGGING, payload: dragging });
  }, []);

  const setDragPreview = useCallback((preview) => {
    dispatch({ type: SET_DRAG_PREVIEW, payload: preview });
  }, []);

  const reorderItems = useCallback((from, to) => {
    dispatch({ type: REORDER_ITEMS, payload: { from, to } });
  }, []);

  const moveItem = useCallback((sourceList, targetList, fromIndex, toIndex) => {
    dispatch({ type: MOVE_ITEM, payload: { sourceList, targetList, fromIndex, toIndex } });
  }, []);

  const moveItemUp = useCallback((id) => {
    dispatch({ type: MOVE_ITEM_UP, payload: id });
  }, []);

  const moveItemDown = useCallback((id) => {
    dispatch({ type: MOVE_ITEM_DOWN, payload: id });
  }, []);

  const moveItemToTop = useCallback((id) => {
    dispatch({ type: MOVE_ITEM_TO_TOP, payload: id });
  }, []);

  const moveItemToBottom = useCallback((id) => {
    dispatch({ type: MOVE_ITEM_TO_BOTTOM, payload: id });
  }, []);

  const moveItemToPosition = useCallback((id, position) => {
    dispatch({ type: MOVE_ITEM_TO_POSITION, payload: { id, position } });
  }, []);

  const swapItems = useCallback((id1, id2) => {
    dispatch({ type: SWAP_ITEMS, payload: { id1, id2 } });
  }, []);

  const insertItemAt = useCallback((index, item) => {
    dispatch({ type: INSERT_ITEM_AT, payload: { index, item } });
  }, []);

  const removeItemAt = useCallback((index) => {
    dispatch({ type: REMOVE_ITEM_AT, payload: index });
  }, []);

  // UI state outside reducer
  const [enabled, setEnabled] = useState(true);
  const [dragConstraints, setDragConstraints] = useState(null);

  // Computed
  const canDrop = useMemo(() => 
    drag.isDragging && drag.dropTarget !== null, 
    [drag.isDragging, drag.dropTarget]
  );
  const isOverTarget = useCallback((targetId) => 
    drag.dragOverTarget === targetId, 
    [drag.dragOverTarget]
  );

  const value = {
    drag,
    enabled,
    setEnabled,
    dragConstraints,
    setDragConstraints,
    canDrop,
    isOverTarget,
    dragStart,
    dragOver,
    dragEnter,
    dragLeave,
    dragEnd,
    drop,
    setDragData,
    clearDragData,
    setDropTarget,
    clearDropTarget,
    setDragging,
    setDragPreview,
    reorderItems,
    moveItem,
    moveItemUp,
    moveItemDown,
    moveItemToTop,
    moveItemToBottom,
    moveItemToPosition,
    swapItems,
    insertItemAt,
    removeItemAt
  };

  return (
    <DragContext.Provider value={value}>
      {children}
    </DragContext.Provider>
  );
}

function useDrag(){
  const context = useContext(DragContext);
  if (context === null) {
    throw new Error("useDrag must be used within a DragProvider");
  }
  return context;
}

export { DragProvider, useDrag };




import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const HistoryContext = createContext(null);

const UNDO = "UNDO";
const REDO = "REDO";
const JUMP_TO_HISTORY = "JUMP_TO_HISTORY";
const CLEAR_HISTORY = "CLEAR_HISTORY";
const SET_HISTORY_LIMIT = "SET_HISTORY_LIMIT";
const START_HISTORY_GROUP = "START_HISTORY_GROUP";
const END_HISTORY_GROUP = "END_HISTORY_GROUP";
const CANCEL_HISTORY_GROUP = "CANCEL_HISTORY_GROUP";
const RECORD_SNAPSHOT = "RECORD_SNAPSHOT";
const RESTORE_SNAPSHOT = "RESTORE_SNAPSHOT";
const SET_HISTORY_INDEX = "SET_HISTORY_INDEX";
const SET_CAN_UNDO = "SET_CAN_UNDO";
const SET_CAN_REDO = "SET_CAN_REDO";

function historyReducer(state, action){
  switch(action.type){
    case UNDO:
      if (state.index <= 0) return state;
      return { 
        ...state, 
        index: state.index - 1,
        canUndo: state.index - 1 > 0,
        canRedo: true 
      };
    case REDO:
      if (state.index >= state.snapshots.length - 1) return state;
      return { 
        ...state, 
        index: state.index + 1,
        canUndo: true,
        canRedo: state.index + 1 < state.snapshots.length - 1 
      };
    case JUMP_TO_HISTORY:
      const jumpIndex = Math.max(0, Math.min(action.payload, state.snapshots.length - 1));
      return { 
        ...state, 
        index: jumpIndex,
        canUndo: jumpIndex > 0,
        canRedo: jumpIndex < state.snapshots.length - 1 
      };
    case CLEAR_HISTORY:
      const current = state.snapshots[state.index];
      return { 
        ...state, 
        snapshots: [current],
        index: 0,
        canUndo: false,
        canRedo: false 
      };
    case SET_HISTORY_LIMIT:
      const trimmed = state.snapshots.slice(-action.payload);
      const newIndex = trimmed.length - 1;
      return { 
        ...state, 
        snapshots: trimmed,
        index: newIndex,
        limit: action.payload,
        canUndo: newIndex > 0,
        canRedo: false 
      };
    case START_HISTORY_GROUP:
      return { 
        ...state, 
        isGrouping: true,
        groupBuffer: [] 
      };
    case END_HISTORY_GROUP:
      if (state.groupBuffer.length === 0) return { ...state, isGrouping: false, groupBuffer: [] };
      const groupedSnapshot = state.groupBuffer.reduce((acc, curr) => ({ ...acc, ...curr }), state.snapshots[state.index]);
      const newSnapshots = [...state.snapshots.slice(0, state.index + 1), groupedSnapshot];
      const limited = state.limit ? newSnapshots.slice(-state.limit) : newSnapshots;
      const adjustedIndex = limited.length - 1;
      return { 
        ...state, 
        snapshots: limited,
        index: adjustedIndex,
        isGrouping: false,
        groupBuffer: [],
        canUndo: adjustedIndex > 0,
        canRedo: false 
      };
    case CANCEL_HISTORY_GROUP:
      return { ...state, isGrouping: false, groupBuffer: [] };
    case RECORD_SNAPSHOT:
      if (state.isGrouping) {
        return { 
          ...state, 
          groupBuffer: [...state.groupBuffer, action.payload] 
        };
      }
      const nextSnapshots = [...state.snapshots.slice(0, state.index + 1), action.payload];
      const finalSnapshots = state.limit ? nextSnapshots.slice(-state.limit) : nextSnapshots;
      const finalIndex = finalSnapshots.length - 1;
      return { 
        ...state, 
        snapshots: finalSnapshots,
        index: finalIndex,
        canUndo: finalIndex > 0,
        canRedo: false 
      };
    case RESTORE_SNAPSHOT:
      return { ...state, index: action.payload };
    case SET_HISTORY_INDEX:
      return { 
        ...state, 
        index: action.payload,
        canUndo: action.payload > 0,
        canRedo: action.payload < state.snapshots.length - 1 
      };
    case SET_CAN_UNDO:
      return { ...state, canUndo: action.payload };
    case SET_CAN_REDO:
      return { ...state, canRedo: action.payload };
    default:
      return state;
  }
}

function HistoryProvider({ children, limit = 50, initialState = {} }){
  const [history, dispatch] = useReducer(historyReducer, {
    snapshots: [initialState],
    index: 0,
    limit: limit,
    canUndo: false,
    canRedo: false,
    isGrouping: false,
    groupBuffer: []
  });

  const [presentState, setPresentState] = useState(initialState);

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  const jumpToHistory = useCallback((index) => {
    dispatch({ type: JUMP_TO_HISTORY, payload: index });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: CLEAR_HISTORY });
  }, []);

  const setHistoryLimit = useCallback((limit) => {
    dispatch({ type: SET_HISTORY_LIMIT, payload: limit });
  }, []);

  const startHistoryGroup = useCallback(() => {
    dispatch({ type: START_HISTORY_GROUP });
  }, []);

  const endHistoryGroup = useCallback(() => {
    dispatch({ type: END_HISTORY_GROUP });
  }, []);

  const cancelHistoryGroup = useCallback(() => {
    dispatch({ type: CANCEL_HISTORY_GROUP });
  }, []);

  const recordSnapshot = useCallback((snapshot) => {
    dispatch({ type: RECORD_SNAPSHOT, payload: snapshot });
  }, []);

  const restoreSnapshot = useCallback((index) => {
    dispatch({ type: RESTORE_SNAPSHOT, payload: index });
  }, []);

  const setHistoryIndex = useCallback((index) => {
    dispatch({ type: SET_HISTORY_INDEX, payload: index });
  }, []);

  const setCanUndo = useCallback((can) => {
    dispatch({ type: SET_CAN_UNDO, payload: can });
  }, []);

  const setCanRedo = useCallback((can) => {
    dispatch({ type: SET_CAN_REDO, payload: can });
  }, []);

  // Sync presentState with history index
  useEffect(() => {
    if (history.snapshots[history.index] !== undefined) {
      setPresentState(history.snapshots[history.index]);
    }
  }, [history.index, history.snapshots]);

  // UI state outside reducer
  const [historyPanelOpen, setHistoryPanelOpen] = useState(false);

  // Computed
  const historyLength = useMemo(() => history.snapshots.length, [history.snapshots]);
  const currentSnapshot = useMemo(() => history.snapshots[history.index], [history.snapshots, history.index]);
  const historyTimeline = useMemo(() => 
    history.snapshots.map((snapshot, idx) => ({
      index: idx,
      timestamp: snapshot._timestamp || Date.now(),
      isActive: idx === history.index,
      label: snapshot._label || `State ${idx + 1}`
    })),
    [history.snapshots, history.index]
  );

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.snapshots) {
          parsed.snapshots.forEach(snapshot => {
            dispatch({ type: RECORD_SNAPSHOT, payload: snapshot });
          });
        }
      } catch (e) {
        console.error('Failed to load history', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify({
      snapshots: history.snapshots
    }));
  }, [history.snapshots]);

  const value = {
    history,
    presentState,
    setPresentState,
    historyLength,
    currentSnapshot,
    historyTimeline,
    historyPanelOpen,
    setHistoryPanelOpen,
    undo,
    redo,
    jumpToHistory,
    clearHistory,
    setHistoryLimit,
    startHistoryGroup,
    endHistoryGroup,
    cancelHistoryGroup,
    recordSnapshot,
    restoreSnapshot,
    setHistoryIndex,
    setCanUndo,
    setCanRedo
  };

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
}

function useHistory(){
  const context = useContext(HistoryContext);
  if (context === null) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
}

export { HistoryProvider, useHistory };


import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const AsyncContext = createContext(null);

const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";
const FETCH_CANCEL = "FETCH_CANCEL";
const FETCH_RETRY = "FETCH_RETRY";
const SET_RETRY_COUNT = "SET_RETRY_COUNT";
const SET_MAX_RETRIES = "SET_MAX_RETRIES";
const REQUEST_PENDING = "REQUEST_PENDING";
const REQUEST_FULFILLED = "REQUEST_FULFILLED";
const REQUEST_REJECTED = "REQUEST_REJECTED";
const REQUEST_TIMEOUT = "REQUEST_TIMEOUT";
const REQUEST_ABORT = "REQUEST_ABORT";
const REQUEST_RETRY = "REQUEST_RETRY";
const OPTIMISTIC_UPDATE = "OPTIMISTIC_UPDATE";
const CONFIRM_UPDATE = "CONFIRM_UPDATE";
const ROLLBACK_UPDATE = "ROLLBACK_UPDATE";
const SET_SYNC_STATUS = "SET_SYNC_STATUS";
const QUEUE_ACTION = "QUEUE_ACTION";
const DEQUEUE_ACTION = "DEQUEUE_ACTION";
const PROCESS_QUEUE = "PROCESS_QUEUE";
const CLEAR_QUEUE = "CLEAR_QUEUE";
const SUBSCRIBE = "SUBSCRIBE";
const UNSUBSCRIBE = "UNSUBSCRIBE";
const RECEIVE_EVENT = "RECEIVE_EVENT";
const CONNECTION_OPEN = "CONNECTION_OPEN";
const CONNECTION_CLOSE = "CONNECTION_CLOSE";
const CONNECTION_ERROR = "CONNECTION_ERROR";
const RECONNECTING = "RECONNECTING";
const RECONNECTED = "RECONNECTED";
const SET_HEARTBEAT = "SET_HEARTBEAT";

function asyncReducer(state, action){
  switch(action.type){
    case FETCH_START:
      return { 
        ...state, 
        requests: { 
          ...state.requests, 
          [action.payload.id]: { status: 'loading', data: null, error: null, timestamp: Date.now() } 
        },
        isLoading: true 
      };
    case FETCH_SUCCESS:
      return { 
        ...state, 
        requests: { 
          ...state.requests, 
          [action.payload.id]: { status: 'success', data: action.payload.data, error: null, timestamp: Date.now() } 
        },
        isLoading: Object.values(state.requests).some(r => r.status === 'loading' && r.id !== action.payload.id),
        lastSuccess: { id: action.payload.id, data: action.payload.data, timestamp: Date.now() }
      };
    case FETCH_ERROR:
      return { 
        ...state, 
        requests: { 
          ...state.requests, 
          [action.payload.id]: { status: 'error', data: null, error: action.payload.error, timestamp: Date.now() } 
        },
        isLoading: Object.values(state.requests).some(r => r.status === 'loading' && r.id !== action.payload.id),
        lastError: { id: action.payload.id, error: action.payload.error, timestamp: Date.now() }
      };
    case FETCH_CANCEL:
      const { [action.payload]: __, ...remainingRequests } = state.requests;
      return { 
        ...state, 
        requests: remainingRequests,
        isLoading: Object.values(remainingRequests).some(r => r.status === 'loading')
      };
    case FETCH_RETRY:
      return { 
        ...state, 
        requests: { 
          ...state.requests, 
          [action.payload]: { ...state.requests[action.payload], status: 'retrying', timestamp: Date.now() } 
        } 
      };
    case SET_RETRY_COUNT:
      return { ...state, retryCount: action.payload };
    case SET_MAX_RETRIES:
      return { ...state, maxRetries: action.payload };
    case REQUEST_PENDING:
      return { 
        ...state, 
        pendingRequests: [...state.pendingRequests, action.payload] 
      };
    case REQUEST_FULFILLED:
      return { 
        ...state, 
        pendingRequests: state.pendingRequests.filter(r => r.id !== action.payload),
        fulfilledRequests: [...state.fulfilledRequests, action.payload] 
      };
    case REQUEST_REJECTED:
      return { 
        ...state, 
        pendingRequests: state.pendingRequests.filter(r => r.id !== action.payload.id),
        rejectedRequests: [...state.rejectedRequests, action.payload] 
      };
    case REQUEST_TIMEOUT:
      return { 
        ...state, 
        timedOutRequests: [...state.timedOutRequests, action.payload] 
      };
    case REQUEST_ABORT:
      return { 
        ...state, 
        abortedRequests: [...state.abortedRequests, action.payload] 
      };
    case REQUEST_RETRY:
      return { 
        ...state, 
        retriedRequests: [...state.retriedRequests, action.payload] 
      };
    case OPTIMISTIC_UPDATE:
      return { 
        ...state, 
        optimisticUpdates: { 
          ...state.optimisticUpdates, 
          [action.payload.id]: { 
            previous: action.payload.previous, 
            current: action.payload.current,
            timestamp: Date.now() 
          } 
        } 
      };
    case CONFIRM_UPDATE:
      const { [action.payload]: __o, ...remainingOptimistic } = state.optimisticUpdates;
      return { ...state, optimisticUpdates: remainingOptimistic };
    case ROLLBACK_UPDATE:
      const rollback = state.optimisticUpdates[action.payload];
      if (!rollback) return state;
      const { [action.payload]: __r, ...restOptimistic } = state.optimisticUpdates;
      return { 
        ...state, 
        optimisticUpdates: restOptimistic,
        rolledBackUpdates: [...state.rolledBackUpdates, action.payload]
      };
    case SET_SYNC_STATUS:
      return { ...state, syncStatus: action.payload };
    case QUEUE_ACTION:
      return { 
        ...state, 
        offlineQueue: [...state.offlineQueue, { ...action.payload, queuedAt: Date.now() }] 
      };
    case DEQUEUE_ACTION:
      return { 
        ...state, 
        offlineQueue: state.offlineQueue.filter((_, i) => i !== action.payload) 
      };
    case PROCESS_QUEUE:
      return { ...state, isProcessingQueue: true };
    case CLEAR_QUEUE:
      return { ...state, offlineQueue: [], isProcessingQueue: false };
    case SUBSCRIBE:
      return { 
        ...state, 
        subscriptions: [...state.subscriptions, action.payload] 
      };
    case UNSUBSCRIBE:
      return { 
        ...state, 
        subscriptions: state.subscriptions.filter(s => s !== action.payload) 
      };
    case RECEIVE_EVENT:
      return { 
        ...state, 
        events: [...state.events, { ...action.payload, receivedAt: Date.now() }] 
      };
    case CONNECTION_OPEN:
      return { ...state, isConnected: true, connectionError: null, lastConnected: Date.now() };
    case CONNECTION_CLOSE:
      return { ...state, isConnected: false, lastDisconnected: Date.now() };
    case CONNECTION_ERROR:
      return { ...state, isConnected: false, connectionError: action.payload };
    case RECONNECTING:
      return { ...state, isReconnecting: true, reconnectAttempt: action.payload };
    case RECONNECTED:
      return { 
        ...state, 
        isConnected: true, 
        isReconnecting: false, 
        reconnectAttempt: 0,
        connectionError: null,
        lastReconnected: Date.now() 
      };
    case SET_HEARTBEAT:
      return { ...state, lastHeartbeat: action.payload };
    default:
      return state;
  }
}

function AsyncProvider({ children, maxRetries = 3 }){
  const [async, dispatch] = useReducer(asyncReducer, {
    requests: {},
    isLoading: false,
    lastSuccess: null,
    lastError: null,
    retryCount: 0,
    maxRetries: maxRetries,
    pendingRequests: [],
    fulfilledRequests: [],
    rejectedRequests: [],
    timedOutRequests: [],
    abortedRequests: [],
    retriedRequests: [],
    optimisticUpdates: {},
    rolledBackUpdates: [],
    syncStatus: 'synced',
    offlineQueue: [],
    isProcessingQueue: false,
    subscriptions: [],
    events: [],
    isConnected: false,
    isReconnecting: false,
    reconnectAttempt: 0,
    connectionError: null,
    lastConnected: null,
    lastDisconnected: null,
    lastReconnected: null,
    lastHeartbeat: null
  });

  const fetchStart = useCallback((id) => {
    dispatch({ type: FETCH_START, payload: { id } });
  }, []);

  const fetchSuccess = useCallback((id, data) => {
    dispatch({ type: FETCH_SUCCESS, payload: { id, data } });
  }, []);

  const fetchError = useCallback((id, error) => {
    dispatch({ type: FETCH_ERROR, payload: { id, error } });
  }, []);

  const fetchCancel = useCallback((id) => {
    dispatch({ type: FETCH_CANCEL, payload: id });
  }, []);

  const fetchRetry = useCallback((id) => {
    dispatch({ type: FETCH_RETRY, payload: id });
  }, []);

  const setRetryCount = useCallback((count) => {
    dispatch({ type: SET_RETRY_COUNT, payload: count });
  }, []);

  const setMaxRetries = useCallback((max) => {
    dispatch({ type: SET_MAX_RETRIES, payload: max });
  }, []);

  const requestPending = useCallback((request) => {
    dispatch({ type: REQUEST_PENDING, payload: request });
  }, []);

  const requestFulfilled = useCallback((id) => {
    dispatch({ type: REQUEST_FULFILLED, payload: id });
  }, []);

  const requestRejected = useCallback((id, error) => {
    dispatch({ type: REQUEST_REJECTED, payload: { id, error } });
  }, []);

  const requestTimeout = useCallback((id) => {
    dispatch({ type: REQUEST_TIMEOUT, payload: id });
  }, []);

  const requestAbort = useCallback((id) => {
    dispatch({ type: REQUEST_ABORT, payload: id });
  }, []);

  const requestRetry = useCallback((id) => {
    dispatch({ type: REQUEST_RETRY, payload: id });
  }, []);

  const optimisticUpdate = useCallback((id, previous, current) => {
    dispatch({ type: OPTIMISTIC_UPDATE, payload: { id, previous, current } });
  }, []);

  const confirmUpdate = useCallback((id) => {
    dispatch({ type: CONFIRM_UPDATE, payload: id });
  }, []);

  const rollbackUpdate = useCallback((id) => {
    dispatch({ type: ROLLBACK_UPDATE, payload: id });
  }, []);

  const setSyncStatus = useCallback((status) => {
    dispatch({ type: SET_SYNC_STATUS, payload: status });
  }, []);

  const queueAction = useCallback((action) => {
    dispatch({ type: QUEUE_ACTION, payload: action });
  }, []);

  const dequeueAction = useCallback((index) => {
    dispatch({ type: DEQUEUE_ACTION, payload: index });
  }, []);

  const processQueue = useCallback(() => {
    dispatch({ type: PROCESS_QUEUE });
  }, []);

  const clearQueue = useCallback(() => {
    dispatch({ type: CLEAR_QUEUE });
  }, []);

  const subscribe = useCallback((channel) => {
    dispatch({ type: SUBSCRIBE, payload: channel });
  }, []);

  const unsubscribe = useCallback((channel) => {
    dispatch({ type: UNSUBSCRIBE, payload: channel });
  }, []);

  const receiveEvent = useCallback((event) => {
    dispatch({ type: RECEIVE_EVENT, payload: event });
  }, []);

  const connectionOpen = useCallback(() => {
    dispatch({ type: CONNECTION_OPEN });
  }, []);

  const connectionClose = useCallback(() => {
    dispatch({ type: CONNECTION_CLOSE });
  }, []);

  const connectionError = useCallback((error) => {
    dispatch({ type: CONNECTION_ERROR, payload: error });
  }, []);

  const reconnecting = useCallback((attempt) => {
    dispatch({ type: RECONNECTING, payload: attempt });
  }, []);

  const reconnected = useCallback(() => {
    dispatch({ type: RECONNECTED });
  }, []);

  const setHeartbeat = useCallback((timestamp) => {
    dispatch({ type: SET_HEARTBEAT, payload: timestamp });
  }, []);

  // UI state outside reducer
  const [networkStatus, setNetworkStatus] = useState('online');

  // Computed
  const activeRequests = useMemo(() => 
    Object.entries(async.requests).filter(([_, r]) => r.status === 'loading'),
    [async.requests]
  );
  const hasErrors = useMemo(() => 
    Object.values(async.requests).some(r => r.status === 'error'),
    [async.requests]
  );
  const isOffline = useMemo(() => networkStatus === 'offline', [networkStatus]);
  const queueLength = useMemo(() => async.offlineQueue.length, [async.offlineQueue]);

  // Network status listener
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const value = {
    async,
    networkStatus,
    setNetworkStatus,
    activeRequests,
    hasErrors,
    isOffline,
    queueLength,
    fetchStart,
    fetchSuccess,
    fetchError,
    fetchCancel,
    fetchRetry,
    setRetryCount,
    setMaxRetries,
    requestPending,
    requestFulfilled,
    requestRejected,
    requestTimeout,
    requestAbort,
    requestRetry,
    optimisticUpdate,
    confirmUpdate,
    rollbackUpdate,
    setSyncStatus,
    queueAction,
    dequeueAction,
    processQueue,
    clearQueue,
    subscribe,
    unsubscribe,
    receiveEvent,
    connectionOpen,
    connectionClose,
    connectionError,
    reconnecting,
    reconnected,
    setHeartbeat
  };

  return (
    <AsyncContext.Provider value={value}>
      {children}
    </AsyncContext.Provider>
  );
}

function useAsync(){
  const context = useContext(AsyncContext);
  if (context === null) {
    throw new Error("useAsync must be used within an AsyncProvider");
  }
  return context;
}

export { AsyncProvider, useAsync };  



import { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";

const UserContext = createContext(null);

const LOGIN_START = "LOGIN_START";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGOUT = "LOGOUT";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const SESSION_EXPIRED = "SESSION_EXPIRED";
const SESSION_REFRESH = "SESSION_REFRESH";
const SESSION_REFRESH_SUCCESS = "SESSION_REFRESH_SUCCESS";
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const CLEAR_USER = "CLEAR_USER";
const SET_USER_PREFERENCES = "SET_USER_PREFERENCES";
const UPDATE_USER_PREFERENCES = "UPDATE_USER_PREFERENCES";
const SET_USER_ROLE = "SET_USER_ROLE";
const SET_USER_PERMISSIONS = "SET_USER_PERMISSIONS";
const CHECK_PERMISSION = "CHECK_PERMISSION";
const SET_IMPERSONATING = "SET_IMPERSONATING";
const STOP_IMPERSONATING = "STOP_IMPERSONATING";
const SET_MFA_REQUIRED = "SET_MFA_REQUIRED";
const SET_MFA_VERIFIED = "SET_MFA_VERIFIED";
const SET_TRUSTED_DEVICE = "SET_TRUSTED_DEVICE";
const SET_SECURITY_QUESTION = "SET_SECURITY_QUESTION";
const LOCK_ACCOUNT = "LOCK_ACCOUNT";
const UNLOCK_ACCOUNT = "UNLOCK_ACCOUNT";
const FORCE_PASSWORD_CHANGE = "FORCE_PASSWORD_CHANGE";

function userReducer(state, action){
  switch(action.type){
    case LOGIN_START:
      return { ...state, isLoggingIn: true, loginError: null };
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        isLoggingIn: false, 
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        loginError: null,
        lastLogin: Date.now()
      };
    case LOGIN_ERROR:
      return { 
        ...state, 
        isLoggingIn: false, 
        isAuthenticated: false,
        loginError: action.payload,
        user: null,
        token: null 
      };
    case LOGOUT:
      return { 
        ...state, 
        isLoggingOut: true 
      };
    case LOGOUT_SUCCESS:
      return { 
        ...state, 
        isAuthenticated: false,
        isLoggingOut: false,
        user: null,
        token: null,
        refreshToken: null,
        permissions: [],
        isImpersonating: false,
        impersonatedUser: null,
        lastLogout: Date.now()
      };
    case SESSION_EXPIRED:
      return { 
        ...state, 
        isAuthenticated: false,
        user: null,
        token: null,
        sessionExpired: true,
        sessionExpiredAt: Date.now()
      };
    case SESSION_REFRESH:
      return { ...state, isRefreshing: true };
    case SESSION_REFRESH_SUCCESS:
      return { 
        ...state, 
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        isRefreshing: false,
        lastRefreshed: Date.now()
      };
    case SET_USER:
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    case UPDATE_USER:
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : action.payload 
      };
    case CLEAR_USER:
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false,
        token: null,
        refreshToken: null 
      };
    case SET_USER_PREFERENCES:
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload } 
      };
    case UPDATE_USER_PREFERENCES:
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload },
        user: state.user ? { ...state.user, preferences: { ...state.user.preferences, ...action.payload } } : state.user
      };
    case SET_USER_ROLE:
      return { 
        ...state, 
        role: action.payload,
        user: state.user ? { ...state.user, role: action.payload } : state.user
      };
    case SET_USER_PERMISSIONS:
      return { ...state, permissions: action.payload };
    case CHECK_PERMISSION:
      return { 
        ...state, 
        permissionChecks: { 
          ...state.permissionChecks, 
          [action.payload]: state.permissions.includes(action.payload) 
        } 
      };
    case SET_IMPERSONATING:
      return { 
        ...state, 
        isImpersonating: true,
        impersonatedUser: action.payload.user,
        originalUser: state.user 
      };
    case STOP_IMPERSONATING:
      return { 
        ...state, 
        isImpersonating: false,
        impersonatedUser: null,
        user: state.originalUser || state.user 
      };
    case SET_MFA_REQUIRED:
      return { ...state, mfaRequired: true };
    case SET_MFA_VERIFIED:
      return { ...state, mfaRequired: false, mfaVerified: true, mfaVerifiedAt: Date.now() };
    case SET_TRUSTED_DEVICE:
      return { ...state, isTrustedDevice: true, trustedDeviceAt: Date.now() };
    case SET_SECURITY_QUESTION:
      return { 
        ...state, 
        securityQuestions: [...(state.securityQuestions || []), action.payload] 
      };
    case LOCK_ACCOUNT:
      return { ...state, isLocked: true, lockedAt: Date.now(), lockedReason: action.payload };
    case UNLOCK_ACCOUNT:
      return { ...state, isLocked: false, lockedAt: null, lockedReason: null };
    case FORCE_PASSWORD_CHANGE:
      return { ...state, forcePasswordChange: true, passwordChangeRequiredAt: Date.now() };
    default:
      return state;
  }
}

function UserProvider({ children }){
  const [user, dispatch] = useReducer(userReducer, {
    isAuthenticated: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isRefreshing: false,
    user: null,
    token: null,
    refreshToken: null,
    role: null,
    permissions: [],
    preferences: {},
    isImpersonating: false,
    impersonatedUser: null,
    originalUser: null,
    mfaRequired: false,
    mfaVerified: false,
    isTrustedDevice: false,
    securityQuestions: [],
    isLocked: false,
    forcePasswordChange: false,
    loginError: null,
    sessionExpired: false,
    permissionChecks: {}
  });

  const loginStart = useCallback(() => {
    dispatch({ type: LOGIN_START });
  }, []);

  const loginSuccess = useCallback((user, token, refreshToken)
