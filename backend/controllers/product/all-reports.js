import Report from '../../models/report.js';
const getReportedProducts = async (user) => {
    if (user.role !== 'admin' && user.role !== 'seller') {
      return { status: 401, data: { error: 'Unauthorized' } };
    }
  
    try {
      const reports = await Report.find().populate('product').populate('user');
      return { status: 200, data: reports };
    } catch (error) {
      throw new Error('An error occurred while fetching reported products.');
    }
  };
  
  export default getReportedProducts