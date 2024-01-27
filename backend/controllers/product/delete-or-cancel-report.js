import Report from '../../models/report.js';
const cancelReport = async (reportId, user) => {
    if (user.role !== 'admin' && user.role !== 'seller') {
      return { status: 401, data: { error: 'Unauthorized' } };
    }
  
    try {
      await Report.findByIdAndDelete(reportId);
      return { status: 200, data: { message: 'Report cancelled successfully' } };
    } catch (error) {
      throw new Error('An error occurred while cancelling the report.');
    }
  };
  export default cancelReport