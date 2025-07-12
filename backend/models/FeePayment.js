import mongoose from 'mongoose';

const FeePaymentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference to your Student model
        required: true,
        comment: 'ID of the student making the payment'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Reference to your Course model
        required: true,
        comment: 'ID of the course for which the payment is made'
    },
    paymentDate: {
        type: Date,
        default: Date.now,
        comment: 'Date and time when the payment was recorded'
    },
    paidAmount: {
        type: Number,
        required: true,
        min: 0,
        comment: 'The amount paid in this specific transaction'
    },
    totalCourseFeeAtPayment: {
        type: Number,
        required: true,
        min: 0,
        comment: 'The total fee of the course at the time this payment was recorded. Important for historical accuracy.'
    },
    balanceAfterPayment: {
        type: Number,
        required: true,
        comment: 'The remaining balance for the course after this payment. Can be negative if overpaid.'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Bank Transfer', 'Online Payment', 'Other'], // Define allowed payment methods
        default: 'Cash',
        comment: 'Method used for this payment'
    },
    receiptNumber: {
        type: String,
        unique: true, // Ensure unique receipt numbers if applicable
        sparse: true, // Allows null values to not violate unique constraint
        comment: 'Optional unique receipt number for the payment'
    },
    notes: {
        type: String,
        trim: true,
        comment: 'Any additional notes or remarks about the payment'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create an index for faster lookup by student and course
FeePaymentSchema.index({ studentId: 1, courseId: 1 });

const FeePayment = mongoose.model('FeePayment', FeePaymentSchema);

export default FeePayment;