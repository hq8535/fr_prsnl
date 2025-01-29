const url = 'https://js.devexpress.com/Demos/Mvc/api/CustomEditors';

const statusLabel = { 'aria-label': 'Status' };

const employees = createStore({
  key: 'ID',
  loadUrl: `${url}/Employees`,
  onBeforeSend(method, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});

const tasks = createStore({
  key: 'ID',
  loadUrl: `${url}/Tasks`,
  updateUrl: `${url}/UpdateTask`,
  insertUrl: `${url}/InsertTask`,
  onBeforeSend(method, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});


const cellTemplate = (container, options) => {
  const noBreakSpace = '\u00A0';
  const assignees = (options.value || []).map((assigneeId) =>
    options.column.lookup.calculateCellValue(assigneeId));
  const text = assignees.join(', ');
  container.textContent = text || noBreakSpace;
  container.title = text;
};
function calculateFilterExpression(filterValue, selectedFilterOperation, target) {
  if (target === 'search' && typeof filterValue === 'string') {
    return [this.dataField, 'contains', filterValue];
  }
  return (rowData) => (rowData.AssignedEmployee || []).indexOf(filterValue) !== -1;
}

const onRowInserted = (e) => e.component.navigateToRow(e.key);
const statusEditorRender = (cell) => {
  const onValueChanged = (e) => cell.setValue(e.value);
  const itemRender = (data) => {
    const imageSource = `images/icons/status-${data.id}.svg`;
    if (data != null) {
      return (
        <div>
          <img
            src={imageSource}
            className="status-icon middle"
          ></img>
          <span className="middle">{data.name}</span>
        </div>
      );
    }
    return <span>(All)</span>;
  };
  return (
    <SelectBox
      defaultValue={cell.value}
      {...cell.column.lookup}
      onValueChanged={onValueChanged}
      inputAttr={statusLabel}
      itemRender={itemRender}
    />
  );
};

const Devcust = () => {

    return(
        <div>

        </div>
    )
}

export default Devcust