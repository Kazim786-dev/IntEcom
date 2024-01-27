// controllers/reportController.js
import Report from '../../models/report.js'; // Import your Report model

const checkUserReports = async (userId, productId) => {
    try {
        const reports = await Report.find({ user: userId, product: productId });
        if (reports.length > 0) {
            return { status: 200, data: { userHasReported: true } };
        } else {
            return { status: 200, data: { userHasReported: false } };
        }
    } catch (error) {
        throw new Error('An error occurred while checking reports.');
    }
};

module.exports = { checkUserReports };
