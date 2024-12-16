export default function Reviews({
    reviewDate,
    reviewComment,
    reviewRating,
    reviewMail,
    reviewName,
}) {
    return (
        <div className="mb-2 ">
            <div className="bg-beige p-2">
                <div className="text-red mb-1 d-flex flex-jcsb">
                    <div className="mr-2">{reviewDate}</div>
                    <div className="text-red mr-2"> {reviewName}</div>
                </div>
                <div className="mb-1 bold text-center">
                    <p>{reviewComment}</p>
                </div>
                <div className="d-flex flex-jcsb">
                    <div className="text-green mr-2">Rating: {reviewRating}</div>
                    <div className="text-blue mr-2">{reviewMail}</div>
                    
                </div>
            </div>
        </div>
    );
}
