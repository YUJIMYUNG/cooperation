const StatusBadge = ({ status }) => {
    let bgColor, textColor, statusText;
  
    switch (status) {
      case 'TODO':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        statusText = '할 일';
        break;
      case 'IN_PROGRESS':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        statusText = '진행 중';
        break;
      case 'DONE':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        statusText = '완료';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        statusText = '미정';
    }
  
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {statusText}
      </span>
    );
  };
  
  export default StatusBadge;