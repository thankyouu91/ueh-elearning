// Vietnamese UI layer. Templates stay in English; when VI is on, a MutationObserver swaps exact-match
// UI strings (text, placeholder, title, aria-label) after each render. Course content stays English.
// shortcut: exact-string dictionary, not per-template keys — move to t('key') if the UI text grows a lot.

const VI = {
  // shell & navigation
  'Dashboard': 'Tổng quan', 'My course': 'Khóa học của tôi', 'Workbook': 'Sách bài tập', 'Case studies': 'Tình huống', 'Assessments': 'Bài kiểm tra',
  'Vocabulary': 'Từ vựng', 'Grades': 'Điểm số', 'Calendar': 'Lịch học', 'Live class': 'Lớp trực tuyến', 'Library': 'Thư viện', 'Lessons': 'Bài giảng',
  'Modules': 'Học phần', 'Exam studio': 'Studio đề thi', 'Gradebook': 'Sổ điểm', 'Live session': 'Buổi dạy trực tuyến', 'Marking': 'Chấm bài',
  'Organisation': 'Tổ chức', 'Curriculum': 'Chương trình', 'Curricula': 'Chương trình đào tạo', 'Framework & units': 'Khung & unit', 'Approvals': 'Phê duyệt',
  'Master timeline': 'Lịch tổng', 'Analytics': 'Phân tích', 'Users': 'Người dùng', 'Licensing': 'Bản quyền', 'Integrations': 'Tích hợp', 'Audit log': 'Nhật ký hệ thống',
  'Demo controls': 'Điều khiển demo', 'Advance week': 'Sang tuần mới', 'Switch account': 'Đổi tài khoản', 'Reset demo': 'Đặt lại demo',
  'Notifications': 'Thông báo', 'Mark all read': 'Đánh dấu đã đọc', 'Today': 'Hôm nay', 'Earlier': 'Trước đó', 'No notifications': 'Không có thông báo',
  'Sign out': 'Đăng xuất', 'Sign in': 'Đăng nhập', 'Dark mode': 'Chế độ tối', 'Light mode': 'Chế độ sáng', 'Switch demo account': 'Đổi tài khoản demo',
  'Learning': 'Học tập', 'UNIVERSITY': 'UNIVERSITY',
  'STUDENT': 'SINH VIÊN', 'LECTURER': 'GIẢNG VIÊN', 'DEAN': 'TRƯỞNG KHOA', 'ADMINISTRATOR': 'QUẢN TRỊ', 'ACADEMIC AFFAIRS': 'PHÒNG ĐÀO TẠO',
  'Student': 'Sinh viên', 'Lecturer': 'Giảng viên', 'Dean': 'Trưởng khoa', 'Administrator': 'Quản trị viên', 'Academic Affairs': 'Phòng Đào tạo', 'Instructor': 'Giảng viên',
  'University leadership': 'Ban Giám hiệu', 'Deans': 'Trưởng khoa', 'Lecturers': 'Giảng viên', 'Students': 'Sinh viên', 'Students (one per class)': 'Sinh viên (mỗi lớp một)',
  'Economics Foundation · Year 1': 'Nền tảng Kinh tế · Năm 1', 'UEH Economics Foundation · Year 1': 'Khung Nền tảng Kinh tế UEH · Năm 1',
  'School of Economics': 'Khoa Kinh tế', 'School of Accounting & Finance': 'Khoa Kế toán – Tài chính', 'School of Marketing': 'Khoa Marketing',
  'Bachelor of Economics': 'Cử nhân Kinh tế', 'Bachelor of Accounting & Finance': 'Cử nhân Kế toán – Tài chính', 'Bachelor of Marketing': 'Cử nhân Marketing',
  'Economics': 'Kinh tế', 'Accounting': 'Kế toán', 'Finance': 'Tài chính', 'Management': 'Quản trị', 'Marketing': 'Marketing',
  'University': 'Đại học', 'School': 'Khoa', 'Programme': 'Ngành', 'Class': 'Lớp', 'Classes': 'Lớp', 'Schools': 'Khoa', 'Programmes': 'Ngành',
  'Demo accounts': 'Tài khoản demo',

  // statuses
  'Draft': 'Nháp', 'Submitted': 'Đã nộp', 'Changes requested': 'Yêu cầu sửa', 'Rejected': 'Từ chối', 'Approved': 'Đã duyệt', 'Scheduled': 'Đã lên lịch',
  'Published': 'Đã phát hành', 'Open': 'Đang mở', 'Closed': 'Đã đóng', 'Graded': 'Đã chấm', 'Missing': 'Bỏ lỡ', 'Awaiting grade': 'Chờ chấm', 'At risk': 'Có nguy cơ',
  'On track': 'Đúng tiến độ', 'Live': 'Trực tiếp', 'Provisional': 'Tạm tính', 'Locked': 'Đã khóa', 'In review': 'Đang duyệt', 'Completed': 'Hoàn thành', 'Correct': 'Đúng',
  'Not started': 'Chưa làm', 'Waiting for marking': 'Chờ chấm', 'Correct first try': 'Đúng ngay lần đầu', 'Pending': 'Đang chờ', 'Signed off': 'Đã ký duyệt',
  'Joined': 'Đã vào', 'Not joined': 'Chưa vào', 'Not released': 'Chưa mở', 'Inactive': 'Không hoạt động', 'Incorrect': 'Sai', 'Not answered': 'Chưa trả lời',
  'Synced': 'Đã đồng bộ', 'Not configured': 'Chưa cấu hình', 'Bank': 'Ngân hàng', 'New': 'Mới', 'Same unit': 'Cùng unit', 'Your sign-off': 'Bạn cần ký duyệt',
  'Ready to finalise': 'Sẵn sàng chốt', 'Unsaved changes': 'Chưa lưu thay đổi', 'Standardized': 'Đề chung',

  // assessment & block types
  'Quiz': 'Kiểm tra nhanh', 'Quizzes': 'Kiểm tra nhanh', 'Unit test': 'Kiểm tra unit', 'Unit tests': 'Kiểm tra unit', 'Case report': 'Báo cáo tình huống',
  'Case reports': 'Báo cáo tình huống', 'Midterm': 'Giữa kỳ', 'Final': 'Cuối kỳ', 'Theory': 'Lý thuyết', 'Simulation': 'Mô phỏng', 'Case discussion': 'Thảo luận tình huống',
  'Practice check': 'Luyện tập', 'Worked problem': 'Bài giải mẫu', 'Textbook extract': 'Trích đoạn giáo trình', 'Library resource': 'Tài liệu thư viện',
  'Case study': 'Tình huống', 'Activity': 'Hoạt động', 'Activities': 'Hoạt động', 'Worksheet': 'Phiếu bài tập', 'Worksheets': 'Phiếu bài tập',
  'Practical session': 'Tiết thực hành', 'Practicals': 'Thực hành', 'Sort it': 'Phân loại', 'Put in order': 'Sắp xếp', 'Calculate': 'Tính toán', 'Write': 'Viết',
  'Remember': 'Nhớ', 'Understand': 'Hiểu', 'Apply': 'Vận dụng', 'Analyze': 'Phân tích',

  // common buttons & labels
  'Add': 'Thêm', 'Cancel': 'Hủy', 'Close': 'Đóng', 'Save': 'Lưu', 'Edit': 'Sửa', 'View': 'Xem', 'Open': 'Mở', 'Back': 'Quay lại', 'Next': 'Tiếp',
  'Previous': 'Trước', 'Submit': 'Nộp', 'Create': 'Tạo', 'Delete': 'Xóa', 'Remove': 'Gỡ', 'Review': 'Xem xét', 'Approve': 'Duyệt', 'Reject': 'Từ chối',
  'Request changes': 'Yêu cầu sửa', 'Print': 'In', 'Preview': 'Xem trước', 'Filter': 'Lọc', 'Search…': 'Tìm kiếm…', 'Join': 'Tham gia', 'Check': 'Kiểm tra',
  'Check order': 'Kiểm tra thứ tự', 'Start': 'Bắt đầu', 'Resume': 'Tiếp tục', 'Duplicate': 'Nhân bản', 'Invite': 'Mời', 'Schedule': 'Lên lịch', 'Unlock': 'Mở khóa',
  'Mark': 'Chấm', 'Grade': 'Chấm điểm', 'Export CSV': 'Xuất CSV', 'Run sync': 'Đồng bộ', 'Pronounce': 'Phát âm', 'Paper': 'Đề thi', 'Answer key': 'Đáp án',
  'Retake': 'Làm lại', 'Back to draft': 'Trả về nháp', 'Back to course': 'Về khóa học', 'Back to dashboard': 'Về tổng quan', 'Back to lessons': 'Về bài giảng',
  'Course': 'Khóa học', 'Cases': 'Tình huống', 'Studio': 'Studio', 'Module': 'Học phần', 'Exam': 'Đề thi', 'Book': 'Sách', 'Extract': 'Trích đoạn',
  'Title': 'Tiêu đề', 'Type': 'Loại', 'Unit': 'Unit', 'Units': 'Unit', 'Week': 'Tuần', 'Status': 'Trạng thái', 'Subject': 'Môn', 'Score': 'Điểm', 'Result': 'Kết quả',
  'Name': 'Tên', 'Role': 'Vai trò', 'Email': 'Email', 'Author': 'Tác giả', 'Owner': 'Chủ đề thi', 'Lead': 'Phụ trách', 'Section': 'Lớp', 'Sections': 'Lớp',
  'Duration': 'Thời lượng', 'Duration (min)': 'Thời lượng (phút)', 'Opens': 'Mở', 'Closes': 'Đóng', 'Window': 'Thời gian', 'Attempts': 'Số lần làm', 'Questions': 'Câu hỏi',
  'Question': 'Câu hỏi', 'Answer': 'Đáp án', 'Category': 'Phân loại', 'Description': 'Mô tả', 'Summary': 'Tóm tắt', 'History': 'Lịch sử', 'Total': 'Tổng',
  'Average': 'Trung bình', 'Accuracy': 'Độ chính xác', 'Engagement': 'Mức tham gia', 'Study time': 'Thời gian học', 'Course grade': 'Điểm học phần',
  'Pass': 'Đạt', 'Delivery': 'Tiến độ', 'Time': 'Thời gian', 'Actor': 'Người thực hiện', 'Event': 'Sự kiện', 'Level': 'Cấp độ', 'Task': 'Nhiệm vụ', 'Tasks': 'Nhiệm vụ',
  'Item': 'Mục', 'Pages': 'Trang', 'Exercises': 'Bài tập', 'Blocks': 'Khối nội dung', 'Activities': 'Hoạt động', 'Contents': 'Mục lục', 'Team': 'Nhóm soạn',
  'Decision': 'Quyết định', 'Weights': 'Trọng số', 'Benchmark': 'Chuẩn', 'Me': 'Tôi', 'You': 'Bạn', 'System': 'Hệ thống', 'Cohort': 'Khóa', 'Used by': 'Dùng bởi',
  'Missed': 'Bỏ lỡ', 'Time limit': 'Giới hạn thời gian', 'Time limit (min)': 'Giới hạn (phút)', 'Time taken': 'Thời gian làm', 'Opens in week': 'Mở vào tuần',
  'Open for': 'Mở trong', 'Number of questions': 'Số câu hỏi', 'Thinking level': 'Cấp độ tư duy', 'PDF file': 'Tệp PDF', 'From page': 'Từ trang', 'To page': 'Đến trang',
  'Teaching week': 'Tuần dạy', 'Summary for students': 'Tóm tắt cho sinh viên', 'Title (optional)': 'Tiêu đề (tùy chọn)', 'Library only': 'Chỉ trong thư viện',
  'Only mine': 'Chỉ của tôi', 'All units': 'Tất cả unit', 'All subjects': 'Tất cả môn', 'All levels': 'Mọi cấp độ', 'All roles': 'Mọi vai trò', 'All actors': 'Mọi người',
  'All add-ons': 'Tất cả phần bổ sung', 'All terms': 'Tất cả thuật ngữ', 'All weeks': 'Tất cả các tuần', 'No change': 'Không đổi', 'No changes.': 'Không có thay đổi.',
  'Search units…': 'Tìm unit…', 'Leave blank to use the unit title': 'Để trống để dùng tên unit', 'Defaults to the unit title': 'Mặc định là tên unit',

  // pages & cards
  'Continue learning': 'Học tiếp', 'To do': 'Việc cần làm', 'Assessments and missed work': 'Bài kiểm tra và bài bỏ lỡ', 'My competencies': 'Năng lực của tôi',
  'Grade breakdown': 'Chi tiết điểm', 'Weighted by the course grading scheme': 'Theo trọng số của học phần', 'Term timeline': 'Lịch học kỳ', 'Year plan': 'Kế hoạch năm',
  'One unit per week': 'Mỗi tuần một unit', 'Published lessons and assessments': 'Bài giảng và bài kiểm tra đã phát hành', 'Study time this week': 'Thời gian học tuần này',
  'Due in 7 days': 'Đến hạn trong 7 ngày', 'All caught up': 'Đã hoàn thành hết', 'Activities': 'Hoạt động', 'Review answers': 'Xem lại đáp án', 'Review last attempt': 'Xem lần làm gần nhất',
  'Course grade now': 'Điểm học phần hiện tại', 'Submit answers': 'Nộp bài', 'Submit your answers?': 'Nộp bài làm?', 'Vocabulary trainer': 'Luyện từ vựng',
  'Click the card to flip it': 'Bấm vào thẻ để lật', 'Join with PIN': 'Tham gia bằng mã PIN', 'You may need support.': 'Bạn có thể cần hỗ trợ.', 'Live now:': 'Đang học trực tiếp:',
  'Waiting for marking': 'Chờ chấm', 'Completed': 'Hoàn thành', 'Your tasks': 'Nhiệm vụ của bạn', 'The situation': 'Tình huống', 'Case study for this unit': 'Tình huống của unit này',
  'Worked solution:': 'Lời giải:', 'Model answer:': 'Bài mẫu:', 'Key ideas:': 'Ý chính:', 'Learning outcome.': 'Mục tiêu học tập.',
  'Practice only — not graded. You get instant feedback.': 'Chỉ để luyện tập — không tính điểm. Có phản hồi ngay.',
  'Class overview': 'Tổng quan lớp', 'At-risk students first': 'Sinh viên có nguy cơ xếp trước', 'Open gradebook': 'Mở sổ điểm', 'Action needed': 'Cần xử lý',
  'Class competencies': 'Năng lực lớp', 'Assessment results': 'Kết quả kiểm tra', 'Average score and submission rate': 'Điểm trung bình và tỉ lệ nộp bài',
  'Term plan': 'Kế hoạch học kỳ', 'Your lessons and assessments by week': 'Bài giảng và bài kiểm tra theo tuần', 'Students': 'Sinh viên', 'Average course grade': 'Điểm học phần trung bình',
  'To grade': 'Cần chấm', 'Lessons in review': 'Bài đang chờ duyệt', 'Start live session': 'Bắt đầu buổi trực tuyến', 'New lesson': 'Bài giảng mới',
  'Lesson bank': 'Ngân hàng bài giảng', 'Class lessons': 'Bài giảng của lớp', 'Class lesson': 'Bài cho lớp', 'Bank lesson': 'Bài trong ngân hàng', 'Lesson builder': 'Soạn bài giảng',
  'From the library': 'Từ thư viện', 'Drop blocks here': 'Thả khối nội dung vào đây', 'Lesson settings': 'Thiết lập bài giảng', 'Submit for approval': 'Gửi duyệt',
  'Submit for approval?': 'Gửi duyệt?', 'Delete draft': 'Xóa bản nháp', 'Delete from bank': 'Xóa khỏi ngân hàng', 'Duplicate to my bank': 'Nhân bản vào ngân hàng của tôi',
  'Present live': 'Trình chiếu trực tiếp', 'Reopen as draft': 'Mở lại thành nháp', 'Start from the unit template': 'Bắt đầu từ mẫu của unit', 'In modules': 'Trong học phần',
  'Library items': 'Tài liệu thư viện', 'New assessment': 'Bài kiểm tra mới', 'Questions from the bank': 'Câu hỏi từ ngân hàng', 'Start a session': 'Bắt đầu buổi học',
  'Start session': 'Bắt đầu', 'End session': 'Kết thúc buổi', 'End this session?': 'Kết thúc buổi học?', 'Join code': 'Mã tham gia', 'PIN valid for': 'Mã PIN có hiệu lực',
  'Calendar': 'Lịch học', 'Student': 'Sinh viên', 'Rubric': 'Tiêu chí chấm', 'Save grade': 'Lưu điểm', 'Gradebook exported': 'Đã xuất sổ điểm',
  'My modules': 'Học phần của tôi', 'New module': 'Học phần mới', 'Locked modules from colleagues': 'Học phần đã khóa của đồng nghiệp', 'Finalise module': 'Chốt học phần',
  'Finalise & send to Dean': 'Chốt & gửi Trưởng khoa', 'Drag into the plan': 'Kéo vào kế hoạch', 'Add-ons': 'Phần bổ sung', 'Drop practical / case study here': 'Thả tiết thực hành / tình huống vào đây',
  'No bank lesson for this unit': 'Chưa có bài trong ngân hàng cho unit này', 'Module': 'Học phần',
  'Upload book': 'Tải sách lên', 'Add book': 'Thêm sách', 'Books': 'Sách', 'Extracts': 'Trích đoạn', 'Open library': 'Mở thư viện', 'Upload the PDF': 'Tải lên tệp PDF',
  'Choose a PDF or drop it here': 'Chọn tệp PDF hoặc thả vào đây', 'Extract a unit': 'Trích một unit', 'Save a page range to use in lessons': 'Lưu một khoảng trang để dùng trong bài giảng',
  'Save extract': 'Lưu trích đoạn', 'Start here': 'Bắt đầu từ đây', 'End here': 'Kết thúc ở đây', 'Note for colleagues (optional)': 'Ghi chú cho đồng nghiệp (tùy chọn)',
  'Add to lesson': 'Thêm vào bài', 'Units this book supports': 'Các unit sách này hỗ trợ', 'Instructions / content': 'Hướng dẫn / nội dung', 'Attachment (optional PDF)': 'Tệp đính kèm (PDF, tùy chọn)',
  'Or add it to one of your lessons:': 'Hoặc thêm vào một bài giảng của bạn:', 'In lessons': 'Trong bài giảng', 'By': 'Bởi',
  'Workbook': 'Sách bài tập', 'Lecturer edition': 'Bản giảng viên', 'Student edition': 'Bản sinh viên', 'Student copy': 'Bản sinh viên', 'Teaching notes': 'Ghi chú giảng dạy',
  'Teaching tip:': 'Gợi ý giảng dạy:', 'Tasks & answers': 'Nhiệm vụ & đáp án', 'Lesson plan': 'Kế hoạch tiết học', 'Key points to draw out': 'Ý chính cần rút ra', 'Extension': 'Mở rộng',
  'Class completion': 'Mức hoàn thành của lớp', 'To mark': 'Cần chấm', 'Marking queue': 'Hàng chờ chấm', 'Start marking': 'Bắt đầu chấm', 'Save & next': 'Lưu & bài tiếp',
  'Feedback to the student': 'Nhận xét cho sinh viên', 'What was good, and one thing to improve': 'Điểm tốt và một điều cần cải thiện', 'All marked': 'Đã chấm hết',
  'Marking guide (4 marks):': 'Tiêu chí chấm (4 điểm):', 'Exhibit': 'Bảng số liệu',
  'Curriculum designer': 'Thiết kế chương trình', 'Unit library': 'Thư viện unit', 'Drag into a week, or drag a week back here to remove it': 'Kéo vào một tuần, hoặc kéo ngược về đây để gỡ',
  'Balance & rules': 'Cân đối & quy tắc', 'Changes vs current': 'Thay đổi so với hiện tại', 'Save draft': 'Lưu nháp', 'Reason for change (shown to the approver)': 'Lý do thay đổi (người duyệt sẽ thấy)',
  'Compare with other programmes': 'So sánh với ngành khác', 'Current intake, all schools': 'Khóa hiện tại, mọi khoa', 'Framework': 'Khung', 'Current': 'Hiện tại',
  'Programme curricula': 'Chương trình các ngành', 'Compare programmes': 'So sánh các ngành', 'Current curriculum': 'Chương trình hiện tại', 'Units per subject': 'Số unit mỗi môn',
  'Next intake': 'Khóa sau', 'Subject balance': 'Cân đối môn', 'vs. framework standard': 'so với khung chuẩn', 'Framework rules': 'Quy tắc khung', 'All rules met.': 'Đạt mọi quy tắc.',
  'Needs your decision': 'Cần bạn quyết định', 'Standard year plan': 'Kế hoạch năm chuẩn', 'Rules for programmes': 'Quy tắc cho các ngành',
  'Locked units are required in every programme': 'Unit có khóa là bắt buộc ở mọi ngành', 'Curriculum in use': 'Chương trình đang dùng',
  'Click a row to drill down': 'Bấm vào một dòng để xem chi tiết', 'Mastery by subject': 'Mức thành thạo theo môn', '% correct vs. benchmark': '% đúng so với chuẩn',
  'Click a name to open the student record': 'Bấm vào tên để mở hồ sơ sinh viên', 'Teaching plan': 'Kế hoạch giảng dạy', 'Lesson progress': 'Tiến độ bài học', 'Recent activity': 'Hoạt động gần đây',
  'Student vs. class average': 'Sinh viên so với trung bình lớp', 'Average grade': 'Điểm trung bình', 'At risk': 'Có nguy cơ', 'Students at risk': 'Sinh viên có nguy cơ',
  'Pending approvals': 'Chờ phê duyệt', 'Term delivery': 'Tiến độ học kỳ', 'Cohort pass rate': 'Tỉ lệ đạt của khóa', 'Approvals inbox': 'Hộp phê duyệt', 'Planning gaps': 'Tuần chưa có bài',
  'Next 4 weeks without a lesson': '4 tuần tới chưa có bài', 'At-risk students': 'Sinh viên có nguy cơ', 'Section comparison': 'So sánh các lớp', 'Cohort competencies': 'Năng lực của khóa',
  'Average grade, pass rate and engagement': 'Điểm TB, tỉ lệ đạt và mức tham gia', 'Recently reviewed': 'Đã duyệt gần đây', 'Approve & lock': 'Duyệt & khóa',
  'Grade distribution': 'Phân bố điểm', 'Student drill-down': 'Chi tiết sinh viên', 'Full gradebook': 'Sổ điểm đầy đủ', 'Course grade, 0–10': 'Điểm học phần, 0–10',
  'New exam paper': 'Đề thi mới', 'Blueprint': 'Ma trận đề', 'Target vs. paper': 'Mục tiêu so với đề', 'By subject': 'Theo môn', 'By thinking level (Bloom)': 'Theo cấp độ tư duy (Bloom)',
  'Add from bank': 'Thêm từ ngân hàng', 'Write new': 'Viết câu mới', 'Add part': 'Thêm phần', 'Send for review': 'Gửi xem xét', 'Send for review?': 'Gửi xem xét?', 'Sign off': 'Ký duyệt',
  'Lock paper': 'Khóa đề', 'Lock this paper?': 'Khóa đề này?', 'Save version': 'Lưu phiên bản', 'Send invitations': 'Gửi lời mời', 'Add selected': 'Thêm câu đã chọn', 'Save & add': 'Lưu & thêm',
  'No comments yet.': 'Chưa có bình luận.', 'Co-editors': 'Đồng biên tập', 'Last edit': 'Sửa lần cuối', 'Total questions': 'Tổng số câu', 'Target by subject': 'Mục tiêu theo môn',
  'Target by thinking level': 'Mục tiêu theo cấp độ tư duy', 'Write a comment… (everyone on the team is notified)': 'Viết bình luận… (cả nhóm sẽ nhận thông báo)',
  'System overview': 'Tổng quan hệ thống', 'Licensed seats': 'Số chỗ bản quyền', 'Active users (7 days)': 'Người dùng hoạt động (7 ngày)', 'Audit events today': 'Sự kiện hôm nay',
  'Recent activity': 'Hoạt động gần đây', 'Full audit log': 'Toàn bộ nhật ký', 'Accounts by role': 'Tài khoản theo vai trò', 'Seats in use': 'Số chỗ đang dùng', 'Valid until': 'Hiệu lực đến',
  'Last 7 days': '7 ngày qua', 'Class / unit': 'Lớp / đơn vị', 'UEH single sign-on': 'Đăng nhập một lần UEH',
  'Hello': 'Xin chào', 'Workflow:': 'Quy trình:', 'Lesson completed': 'Đã hoàn thành bài', 'Demo data restored': 'Đã đặt lại dữ liệu demo', 'Correct!': 'Chính xác!',
  'Draft saved': 'Đã lưu nháp', 'Added to the lesson': 'Đã thêm vào bài', 'Queue empty — all marked': 'Hết bài chờ — đã chấm xong',
  'Reading': 'Đọc', 'Listening': 'Nghe', 'Speaking': 'Nói', 'Writing': 'Viết', 'Record': 'Ghi âm', '4-skill bank': 'Ngân hàng 4 kỹ năng', 'My four skills': 'Bốn kỹ năng của tôi',
  'Start recording': 'Bắt đầu ghi âm', 'Stop recording': 'Dừng ghi âm', 'Record again': 'Ghi âm lại', 'Play recording': 'Phát bài nghe', 'Transcript': 'Lời thoại',
  'No microphone? Type what you would say': 'Không có micro? Gõ nội dung bạn sẽ nói', 'Listen up to twice, then answer.': 'Nghe tối đa hai lần, rồi trả lời.',
  'Coverage by unit': 'Độ phủ theo đơn vị', 'All skills': 'Mọi kỹ năng', 'All levels': 'Mọi cấp độ', 'All units': 'Mọi đơn vị', 'Show the B1 pack': 'Xem gói B1',
  'Business English · Level 1 (CEFR B1)': 'Tiếng Anh kinh doanh · Cấp 1 (CEFR B1)', 'Recording': 'Bản ghi âm', 'Typed instead of recording': 'Gõ thay cho ghi âm',
};

const PATTERNS = [
  [/^Week (\d+)\/(\d+)$/, 'Tuần $1/$2'], [/^Week (\d+)$/, 'Tuần $1'], [/^Week (\d+) · now$/, 'Tuần $1 · hiện tại'], [/^Week (\d+) of (\d+)$/, 'Tuần $1/$2'],
  [/^AY (\S+) · Term (\d+)$/, 'Năm học $1 · Học kỳ $2'], [/^(\d+) min$/, '$1 phút'], [/^(\d+) min ago$/, '$1 phút trước'], [/^(\d+) h ago$/, '$1 giờ trước'],
  [/^(\d+) d ago$/, '$1 ngày trước'], [/^just now$/, 'vừa xong'], [/^Hello, (.+)$/, 'Xin chào, $1'], [/^Good morning, (.+)$/, 'Chào buổi sáng, $1'],
  [/^This week · week (\d+)$/, 'Tuần này · tuần $1'], [/^(\d+)\/(\d+) weeks planned$/, 'Đã lên kế hoạch $1/$2 tuần'], [/^(\d+) teaching hours$/, '$1 giờ dạy'],
  [/^(\d+) add-ons$/, '$1 phần bổ sung'], [/^(\d+) to mark$/, '$1 bài cần chấm'], [/^Marked (\d)\/4$/, 'Đã chấm $1/4'], [/^Try again · (\d+) tries$/, 'Làm lại · $1 lần'],
  [/^Waiting for review · (\d+)$/, 'Chờ duyệt · $1'], [/^Lessons waiting for review · (\d+)$/, 'Bài giảng chờ duyệt · $1'], [/^Modules waiting for approval · (\d+)$/, 'Học phần chờ duyệt · $1'],
  [/^Discussion · (\d+)$/, 'Thảo luận · $1'], [/^At-risk students · (\d+)$/, 'Sinh viên có nguy cơ · $1'], [/^Approve all \((\d+)\)$/, 'Duyệt tất cả ($1)'],
  [/^Review approvals \((\d+)\)$/, 'Xem phê duyệt ($1)'], [/^Marking queue \((\d+)\)$/, 'Hàng chờ chấm ($1)'], [/^Continue (\w+)$/, 'Tiếp tục $1'],
  [/^Opens (.+)$/, 'Mở $1'], [/^Closes (.+)$/, 'Đóng $1'],
  [/^AY (\S+) · Term (\d+) · week (\d+) of (\d+)$/, 'Năm học $1 · HK $2 · tuần $3/$4'], [/^Pass rate (.+)$/, 'Tỉ lệ đạt $1'], [/^(\d+) at risk$/, '$1 có nguy cơ'],
  [/^(\d+) need changes$/, '$1 bài cần sửa'], [/^(\d+) classes$/, '$1 lớp'], [/^(\d+) students$/, '$1 sinh viên'], [/^(.+) · Economics Foundation · Year 1$/, (_, x) => `${tv(x)} · Nền tảng Kinh tế · Năm 1`],
  [/^(\d+) of (\d+) lesson-weeks published$/, 'Đã phát hành $1/$2 tuần-bài'], [/^Oldest (.+)$/, 'Cũ nhất $1'], [/^(\d+)% of cohort$/, '$1% của khóa'],
  [/^Waiting for the Academic Director since (.+)$/, 'Chờ Trưởng khoa duyệt từ $1'], [/^Term delivery (.+)$/, 'Tiến độ học kỳ $1'],
  [/^(\d+) lessons in review · (\d+) to grade$/, '$1 bài chờ duyệt · $2 bài cần chấm'], [/^(\d+) programme\(s\)$/, '$1 ngành'], [/^(.+) — curriculum change$/, '$1 — thay đổi chương trình'], [/^(\d+)\/(\d+) done$/, 'Đã làm $1/$2'], [/^(\d+) exercises$/, '$1 bài tập'], [/^teaching (\d+) classes$/, 'dạy $1 lớp'], [/^(\d+) units · (\d+)h$/, '$1 unit · $2 giờ'], [/^(\d+) units$/, '$1 unit'], [/^Lessons · (\d+)$/, 'Bài giảng · $1'], [/^Workbook · (\d+) exercises$/, 'Sách bài tập · $1 bài'], [/^Question bank · (\d+)$/, 'Ngân hàng câu hỏi · $1'], [/^Key terms · (\d+)$/, 'Thuật ngữ · $1'],
];
Object.assign(VI, { 'Teaching staff': 'Phân công giảng dạy', 'Assignments by class': 'Phân công theo lớp', 'Lecturer workload': 'Khối lượng giảng dạy', 'Class lead': 'Phụ trách lớp',
  'Unassigned': 'Chưa phân công', 'Subjects staffed': 'Môn đã phân công', 'Over the limit': 'Vượt định mức', 'Over limit': 'Vượt định mức', 'Near limit': 'Gần định mức', 'Available': 'Còn trống',
  'OK': 'Ổn', 'Hours this term': 'Giờ dạy học kỳ này', 'Assignments': 'Phân công', 'Assignment saved': 'Đã lưu phân công', 'None': 'Chưa có', 'class × subject slots': 'ô lớp × môn',
  'Lessons, marking and reminders for a subject go to the lecturer assigned here': 'Bài giảng, chấm bài và nhắc việc của mỗi môn sẽ đến giảng viên được phân công ở đây',
  'All classes the lecturer teaches, including other schools': 'Tất cả lớp giảng viên dạy, kể cả khoa khác', 'Lessons fall back to the class lead': 'Tạm giao cho phụ trách lớp',
  'Every subject has a lecturer': 'Môn nào cũng có giảng viên', 'Unassigned:': 'Chưa phân công:' });
Object.assign(VI, { 'Learning outcome': 'Mục tiêu học tập', 'Worked example:': 'Ví dụ mẫu:', 'No lessons yet': 'Chưa có bài giảng', 'No exercises yet.': 'Chưa có bài tập.', 'None yet.': 'Chưa có.', 'No library material linked.': 'Chưa có tài liệu thư viện.', 'Click for details · drag to move': 'Bấm để xem chi tiết · kéo để di chuyển' });
Object.assign(VI, { 'None at risk': 'Không ai có nguy cơ', 'Workshop rubrics': 'Chấm theo rubric', 'No changes requested': 'Không có yêu cầu sửa', 'Inbox clear': 'Không có việc chờ',
  'Nothing missed': 'Không bỏ lỡ bài nào', 'Avg grade': 'Điểm TB', 'In review': 'Đang duyệt', 'Lesson activities completed': 'Hoạt động bài học đã hoàn thành', 'Course grade ≥ 5.0': 'Điểm học phần ≥ 5.0' });
Object.assign(VI, { 'Compare schools': 'So sánh các khoa', 'Compare programmes': 'So sánh các ngành', 'Compare classes': 'So sánh các lớp' });

let lang = 'en';
const ATTRS = ['placeholder', 'title', 'aria-label'];

// UI chrome only: course content (lesson, case, vocabulary text) stays 100% English by design.
const SEPS = [' · ', ' — ', ' – ', '; '];
const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sept: 9, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
const DATE_G = /\b(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)\b/g;

/** Whole string first, then a pattern, then each " · "-style segment on its own. */
function tv(key) {
  let v = VI[key];
  if (v === undefined) { for (const [re, rep] of PATTERNS) if (re.test(key)) { v = key.replace(re, rep); break; } }
  if (v !== undefined) return v;
  const sep = SEPS.find(x => key.includes(x));
  return sep ? key.split(sep).map(p => p ? tv(p) : p).join(sep) : key;
}

function tr(text) {
  const key = text.trim();
  if (!key) return null;
  const v = tv(key).replace(DATE_G, (_, d, m) => `${d}/${MONTHS[m]}`);
  if (v === key) return null;
  return text.replace(key, v);
}

export function translate(root) {
  if (lang !== 'vi' || !root) return;
  if (root.nodeType === Node.TEXT_NODE) { const v = tr(root.nodeValue); if (v) root.nodeValue = v; return; }
  if (root.nodeType !== Node.ELEMENT_NODE || root.closest?.('.prose, .q-stem, [data-no-i18n]')) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement?.closest('.prose, .q-stem, script, style, [data-no-i18n]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) { const v = tr(n.nodeValue); if (v) n.nodeValue = v; }
  for (const el of [root, ...root.querySelectorAll('[placeholder], [title], [aria-label]')]) {
    for (const a of ATTRS) { const cur = el.getAttribute?.(a); if (cur) { const v = tr(cur); if (v) el.setAttribute(a, v); } }
  }
}

export function setLang(next) {
  lang = next === 'vi' ? 'vi' : 'en';
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-switch button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
}
export const getLang = () => lang;

new MutationObserver(muts => { if (lang === 'vi') for (const m of muts) m.addedNodes.forEach(translate); })
  .observe(document.body, { childList: true, subtree: true });

// lecturer dashboard & gradebook
Object.assign(VI, { 'My classes': 'Lớp của tôi', 'Click a class to open its gradebook': 'Bấm vào lớp để mở sổ điểm', 'Needs attention': 'Cần chú ý', 'All': 'Tất cả',
  'Find class…': 'Tìm lớp…', 'Needs attention first': 'Cần chú ý trước', 'Lowest average first': 'Điểm TB thấp trước', 'Class code': 'Mã lớp', 'Expand all': 'Mở tất cả',
  'Collapse all': 'Thu gọn tất cả', 'Find student or ID…': 'Tìm sinh viên hoặc mã…', 'At risk only': 'Chỉ SV có nguy cơ', 'All on track': 'Tất cả đúng tiến độ', 'To mark': 'Cần chấm',
  'Term ends': 'Hết học kỳ', 'Classes': 'Lớp', 'No classes match': 'Không có lớp phù hợp', 'Low engagement': 'Tham gia thấp', 'lead only': 'chỉ phụ trách' });
PATTERNS.unshift(
  [/^(\d+) classes$/, '$1 lớp'], [/^(\d+) need attention$/, '$1 lớp cần chú ý'], [/^(\d+) written · (\d+) case reports$/, '$1 bài viết · $2 báo cáo tình huống'], [/^(\d+) to grade$/, '$1 bài cần chấm điểm'],
  [/^(\d+) classes · (\d+) students · week (\d+) of (\d+)$/, '$1 lớp · $2 sinh viên · tuần $3/$4'], [/^Pass rate (.+) · (\d+) at risk$/, 'Tỉ lệ đạt $1 · $2 có nguy cơ'],
  [/^(\d+) classes · weights: (.+)$/, '$1 lớp · trọng số: $2'], [/^Week (\d+) lesson not ready$/, 'Bài tuần $1 chưa sẵn sàng'], [/^(\d+) written answers to mark$/, '$1 bài viết cần chấm'],
  [/^(\d+) case reports to grade$/, '$1 báo cáo tình huống cần chấm'],
);

// bento case editor & block preview
Object.assign(VI, { 'Edit layout': 'Sửa bố cục', 'New case': 'Tình huống mới', 'New case study': 'Tình huống mới', 'Add a tile': 'Thêm ô', 'Drag onto the grid or click': 'Kéo vào lưới hoặc bấm',
  'Text': 'Văn bản', 'Image': 'Hình ảnh', 'Audio': 'Âm thanh', 'Data table': 'Bảng số liệu', 'Multiple choice': 'Trắc nghiệm', 'Calculation': 'Tính toán', 'Written task': 'Bài viết',
  'Save case': 'Lưu tình huống', 'Discard': 'Hủy thay đổi', 'Show transcript': 'Xem lời thoại', 'Play (voice)': 'Phát (giọng đọc)', 'Student view': 'Góc nhìn sinh viên',
  'Preview this block': 'Xem trước khối này', 'Choose an answer': 'Chọn một đáp án', 'Case saved': 'Đã lưu tình huống', 'Add tile': 'Thêm ô', 'Save tile': 'Lưu ô',
  'Create & edit': 'Tạo & soạn', 'Drop here to add at the end': 'Thả vào đây để thêm cuối', 'Preview as students see it': 'Xem như sinh viên', 'Short title': 'Tiêu đề ngắn',
  'Correct answer': 'Đáp án đúng', 'Explanation shown after answering': 'Giải thích hiện sau khi trả lời', 'Caption': 'Chú thích', 'Transcript (used for the voice if no file)': 'Lời thoại (dùng cho giọng đọc nếu không có tệp)' });
PATTERNS.unshift([/^Edit case · (.+)$/, 'Sửa tình huống · $1'], [/^Check (\d+)$/, 'Câu hỏi $1']);

// grouped lecturer sidebar & merged grading
Object.assign(VI, { 'Teach live': 'Dạy trực tuyến', 'Teaching': 'Giảng dạy', 'Materials': 'Học liệu', 'Assessment': 'Đánh giá', 'Workbook & cases': 'Bài tập & tình huống',
  'Grades & marking': 'Điểm & chấm bài', 'This class is fully marked': 'Lớp này đã chấm xong', 'Nothing to mark': 'Không có bài cần chấm' });
PATTERNS.unshift([/^Mark next \((\d+)\)$/, 'Chấm tiếp ($1)'], [/^Mark (\d+)$/, 'Chấm $1'], [/^Mark (\S+) \((\d+)\)$/, 'Chấm $1 ($2)']);

// plain-language labels for newcomers (override earlier entries)
Object.assign(VI, { 'Dashboard': 'Trang chủ', 'Modules': 'Kế hoạch 16 tuần', 'Exam studio': 'Soạn đề thi', 'Engagement': 'Mức độ hoàn thành bài',
  'Lesson bank': 'Kho bài mẫu', 'Class lessons': 'Bài đã giao cho lớp', 'Lesson for one class': 'Bài cho một lớp', 'Reusable lesson': 'Bài mẫu dùng lại',
  'Teaching one class this week? Create a lesson for that class. Want to reuse it every term? Create a reusable lesson.': 'Dạy một lớp trong tuần này? Tạo bài cho lớp đó. Muốn dùng lại mỗi học kỳ? Tạo bài mẫu dùng lại.',
  'Study': 'Học tập', 'Practice': 'Luyện tập', 'Timetable': 'Lịch & lớp trực tuyến', 'Hide': 'Ẩn', 'Demo controls': 'Công cụ demo',
  "Study this week's lesson": 'Học bài tuần này', 'Open My course and choose the current week.': 'Vào "Khóa học của tôi" và chọn tuần hiện tại.',
  'Do open assessments': 'Làm bài kiểm tra đang mở', 'Check the deadlines so nothing is missed.': 'Xem hạn nộp để không bỏ lỡ bài nào.',
  'See your results': 'Xem kết quả', 'Grades and feedback from your lecturer.': 'Điểm và nhận xét của giảng viên.',
  "Prepare next week's lesson": 'Chuẩn bị bài tuần tới', 'Create or edit a lesson for one of your classes.': 'Tạo hoặc sửa bài giảng cho một lớp của bạn.',
  'Mark student work': 'Chấm bài sinh viên', 'The number in the menu shows how many answers wait for you.': 'Con số trên menu cho biết số bài đang chờ bạn chấm.',
  'Teach a live class': 'Dạy lớp trực tuyến', 'Start a session; students join with a PIN.': 'Mở buổi học; sinh viên vào bằng mã PIN.' });

// remaining platform chrome (student + lecturer pages)
Object.assign(VI, { 'Provisional — final not taken yet': 'Tạm tính — chưa thi cuối kỳ', 'Resume lesson': 'Học tiếp', 'Start lesson': 'Bắt đầu học',
  '% correct by skill vs. programme benchmark': '% đúng theo kỹ năng so với chuẩn của ngành', '% correct by skill': '% đúng theo kỹ năng', 'No results yet': 'Chưa có kết quả',
  'Main navigation': 'Menu chính', 'Open navigation': 'Mở menu', 'Account menu': 'Menu tài khoản', 'UEH Learning home': 'Trang chủ UEH Learning', 'Find class': 'Tìm lớp',
  'Sort classes': 'Sắp xếp lớp', 'Find student': 'Tìm sinh viên', 'Flip card': 'Lật thẻ', 'Search library': 'Tìm trong thư viện', 'Avg': 'TB', 'Eng': 'Hoàn thành',
  'Economics Foundation': 'Nền tảng Kinh tế', 'Year 1': 'Năm 1', 'now': 'hiện tại',
  'published': 'đã phát hành', 'scheduled': 'đã lên lịch', 'submitted': 'đã nộp', 'draft': 'nháp', 'changes': 'cần sửa', 'changes requested': 'yêu cầu sửa',
  'closed': 'đã đóng', 'open': 'đang mở', 'approved': 'đã duyệt', 'signed off': 'đã ký duyệt',
  'Workbook and case tasks in your subjects': 'Bài tập và tình huống thuộc môn bạn dạy',
  'Practise each unit: sort, order, calculate and write. Auto-checked exercises give instant feedback; written answers are marked by your lecturer.': 'Luyện tập từng unit: phân loại, sắp xếp, tính toán và viết. Bài tự chấm cho kết quả ngay; bài viết do giảng viên chấm.',
  'Auto-checked and marked work': 'Bài tự chấm và đã chấm', 'Written answers': 'Bài viết',
  'Real business situations with data. Calculate, analyse and recommend.': 'Tình huống kinh doanh thực tế có số liệu. Tính toán, phân tích và đề xuất.',
  'Quizzes, tests and workshop tasks for your class': 'Kiểm tra nhanh, bài kiểm tra và bài workshop của lớp bạn', 'In workshop': 'Làm tại lớp',
  'English–Vietnamese with pronunciation': 'Anh–Việt kèm phát âm', 'How your course grade is calculated': 'Cách tính điểm học phần',
  'Categories without results are left out and their weight is shared among the others until results arrive. Missed assessments count as 0.': 'Nhóm điểm chưa có kết quả được tạm bỏ qua, trọng số chia cho các nhóm còn lại. Bài bỏ lỡ tính 0 điểm.',
  'gaps are weeks with no lesson planned': 'ô trống là tuần chưa có bài giảng',
  'No live class right now': 'Hiện chưa có lớp trực tuyến', 'You will get a notification with the PIN when your instructor starts one.': 'Bạn sẽ nhận thông báo kèm mã PIN khi giảng viên mở lớp.',
  'Present a published lesson in class. Students join with a PIN and are credited attendance time.': 'Trình chiếu bài giảng đã phát hành trên lớp. Sinh viên vào bằng mã PIN và được tính thời gian tham dự.',
  'Lesson': 'Bài giảng', 'Lessons from other lecturers can be duplicated into your bank and adapted.': 'Bài của giảng viên khác có thể sao chép vào kho của bạn để chỉnh sửa.',
  'Research': 'Tra cứu', 'Build lessons': 'Soạn bài', 'Arrange plan': 'Sắp xếp kế hoạch', 'Finalise for classes': 'Chốt cho các lớp', 'Dean locks': 'Trưởng khoa khóa',
  'No modules yet': 'Chưa có kế hoạch nào', 'Create one for the programme you teach.': 'Tạo một kế hoạch cho ngành bạn dạy.',
  'UEH Business & Economics collection': 'Bộ sách Kinh doanh & Kinh tế UEH', 'research the books, extract units, and add materials to lessons': 'tra cứu sách, trích unit và thêm tài liệu vào bài giảng',
  'Case study / activity': 'Tình huống / hoạt động', 'Library → open a book and research → save page ranges as': 'Thư viện → mở sách để tra cứu → lưu các trang thành',
  'extracts': 'trích đoạn', '→ add extracts, case studies, activities, worksheets and practicals to lessons → arrange lessons in a': '→ thêm trích đoạn, tình huống, hoạt động, phiếu bài tập và thực hành vào bài giảng → sắp xếp bài vào',
  'module plan': 'kế hoạch 16 tuần', '→ finalise the module for a programme and its classes.': '→ chốt kế hoạch cho ngành và các lớp.', 'No PDF yet': 'Chưa có PDF',
  '* Provisional: categories without results yet are excluded and their weight is redistributed.': '* Tạm tính: nhóm điểm chưa có kết quả được bỏ qua và trọng số được chia lại.',
  'Your quizzes and workshop tasks, plus standardized exams set by the Academic Director': 'Bài kiểm tra nhanh và bài workshop của bạn, cùng đề chung do Trưởng khoa ra',
  'Rubric graded': 'Chấm theo rubric', 'Exams you have been invited to co-edit.': 'Đề thi bạn được mời cùng soạn.' });
const GRADE_CAT = { Quizzes: 'Kiểm tra nhanh', 'Unit tests': 'Kiểm tra unit', 'Case reports': 'Báo cáo tình huống', Midterm: 'Giữa kỳ', Final: 'Cuối kỳ' };
PATTERNS.unshift(
  [/^(\d+)\/(\d+) activities$/, '$1/$2 hoạt động'], [/^([−+])(.+) vs last week$/, '$1$2 so với tuần trước'], [/^(\d+h \d+m) total$/, 'tổng $1'],
  [/^(\d+)d (\d+)h left$/, 'còn $1 ngày $2 giờ'], [/^(\d+)h (\d+)m left$/, 'còn $1 giờ $2 phút'], [/^(\d+)\/(\d+) exercises$/, '$1/$2 bài tập'], [/^(\d+)% accuracy$/, 'chính xác $1%'],
  [/^(\d+) written answer\(s\) waiting for marking$/, '$1 bài viết đang chờ chấm'], [/^W(\d+)$/, 'T$1'], [/^(\d+) of (\d+) units released$/, 'đã mở $1/$2 unit'],
  [/^(\d+) tasks?$/, '$1 nhiệm vụ'], [/^week (\d+)$/, 'tuần $1'], [/^(\d+) of (\d+) exercises in released units$/, '$1/$2 bài tập trong các unit đã mở'], [/^(\d+) waiting$/, '$1 đang chờ'],
  [/^(\d+) business terms$/, '$1 thuật ngữ kinh doanh'], [/^Card (\d+) of (\d+)$/, 'Thẻ $1/$2'], [/^pass mark (.+)$/, 'điểm đạt $1'],
  [/^(Quizzes|Unit tests|Case reports|Midterm|Final) (\d+)%$/, (_, c, p) => `${GRADE_CAT[c]} ${p}%`], [/^Term (\d+)$/, 'Học kỳ $1'], [/^AY (\S+)$/, 'Năm học $1'], [/^(\d+) weeks$/, '$1 tuần'],
  [/^(\d+) hours?$/, '$1 giờ'], [/^(.+): No lesson$/, '$1: Chưa có bài'], [/^· (\d+) students$/, '· $1 sinh viên'], [/^(\S+) · (\d+) students ·$/, '$1 · $2 sinh viên ·'],
  [/^W(\d+) · (\S+) \(colleague\)$/, 'T$1 · $2 (đồng nghiệp)'], [/^Changes requested: (.+)$/, 'Yêu cầu sửa: $1'], [/^waiting for the Dean since (.+)$/, 'chờ Trưởng khoa duyệt từ $1'],
  [/^Notifications, (\d+) unread$/, 'Thông báo, $1 chưa đọc'], [/^Lecturer edition for (\S+)$/, 'Bản giảng viên cho $1'], [/^(\d+) exercises in this programme$/, '$1 bài tập trong ngành này'],
  [/^Course grade (.+) is below the pass mark$/, 'Điểm học phần $1 dưới mức đạt'], [/^Engagement (.+) is below (.+)$/, 'Mức hoàn thành bài $1 dưới $2'],
  [/^(\d+) missed assessments?$/, 'bỏ lỡ $1 bài kiểm tra'], [/^(\d+) questions$/, '$1 câu hỏi'], [/^(\d+) attempts?$/, '$1 lượt làm'],
);

// dean, academic affairs and admin pages
Object.assign(VI, { 'Organisation filter': 'Lọc theo đơn vị', 'Breadcrumb': 'Đường dẫn', 'Assign a lecturer to each subject in each class': 'Phân công giảng viên cho từng môn ở từng lớp',
  'read-only': 'chỉ xem', 'Which week each unit is taught in, per programme (current intake)': 'Mỗi unit được dạy ở tuần nào, theo từng ngành (khóa hiện tại)', 'Required': 'Bắt buộc',
  'every programme starts from this skeleton': 'mọi ngành đều bắt đầu từ khung này', 'Exactly 16 units, one per teaching week': 'Đúng 16 unit, mỗi tuần học một unit',
  'Required core units:': 'Unit cốt lõi bắt buộc:', 'At least 2 units in each core subject (Economics, Accounting, Finance, Management)': 'Ít nhất 2 unit cho mỗi môn cốt lõi (Kinh tế, Kế toán, Tài chính, Quản trị)',
  "Remaining weeks are free for the school's specialism (e.g. Marketing)": 'Các tuần còn lại dành cho chuyên ngành của khoa (VD: Marketing)',
  'Changes are approved by Academic Affairs and apply from the next intake': 'Thay đổi do Phòng Đào tạo duyệt và áp dụng từ khóa tuyển sinh tiếp theo', 'Key terms': 'Thuật ngữ',
  'Required core unit': 'Unit cốt lõi bắt buộc', 'Build exam papers with your lecturers: set the blueprint, invite co-editors, review together, lock and schedule.': 'Soạn đề thi cùng giảng viên: lập ma trận đề, mời người cùng soạn, duyệt chung, khóa và lên lịch.',
  'Units with few questions limit how many papers you can build': 'Unit có ít câu hỏi sẽ giới hạn số đề có thể soạn', 'Lessons submitted by instructors': 'Bài giảng giảng viên đã nộp',
  '% correct vs. programme benchmark': '% đúng so với chuẩn của ngành', 'All sections': 'Tất cả lớp', 'dashed boxes are unplanned weeks': 'ô nét đứt là tuần chưa có kế hoạch',
  'No question bank yet': 'Chưa có ngân hàng câu hỏi', 'Bar = units in this plan': 'Thanh = số unit trong kế hoạch', 'marker = framework standard (4 per core subject).': 'vạch = chuẩn của khung (4 cho mỗi môn cốt lõi).',
  'Meets framework rules: 16 weeks, required core units, ≥ 2 units per core subject.': 'Đạt quy định của khung: 16 tuần, đủ unit cốt lõi bắt buộc, ≥ 2 unit mỗi môn cốt lõi.',
  'Search units': 'Tìm unit', 'e.g. Employers ask for stronger digital marketing skills': 'VD: Nhà tuyển dụng cần kỹ năng marketing số tốt hơn',
  'Approved lessons are scheduled and publish automatically when their week starts': 'Bài đã duyệt được lên lịch và tự phát hành khi đến tuần học',
  'A whole 16-week plan finalised by a lecturer for specific classes': 'Kế hoạch 16 tuần giảng viên đã chốt cho các lớp cụ thể', 'No modules waiting': 'Không có kế hoạch nào đang chờ',
  'Synced at least once (simulated)': 'Đã đồng bộ ít nhất một lần (mô phỏng)', 'provisioning will come from OneRoster': 'tài khoản sẽ được cấp tự động từ OneRoster', 'campus licence': 'giấy phép toàn trường',
  'Connections to UEH systems': 'Kết nối với hệ thống UEH', 'These connectors are': 'Các kết nối này', 'simulated': 'chỉ là mô phỏng',
  'in the demo — a sync only writes an audit entry. Real endpoints are configured during deployment.': 'trong bản demo — đồng bộ chỉ ghi một dòng nhật ký. Kết nối thật sẽ được cấu hình khi triển khai.',
  'Launch UEH Learning from the university LMS and pass back grades.': 'Mở UEH Learning từ LMS của trường và gửi điểm về.', 'Never synced': 'Chưa đồng bộ lần nào',
  'Nightly roster sync of students, staff and class sections.': 'Đồng bộ danh sách sinh viên, cán bộ và lớp mỗi đêm.', 'Sign in with UEH accounts (SAML/OIDC).': 'Đăng nhập bằng tài khoản UEH (SAML/OIDC).',
  'Every state change across all roles is recorded here': 'Mọi thay đổi của tất cả vai trò đều được ghi lại ở đây',
  'No exams yet': 'Chưa có đề thi', 'You will see exams here when a Dean invites you.': 'Đề thi sẽ hiện ở đây khi Trưởng khoa mời bạn cùng soạn.', 'Create the first paper.': 'Tạo đề thi đầu tiên.' });
const SUBJ = { Economics: 'Kinh tế', Accounting: 'Kế toán', Finance: 'Tài chính', Management: 'Quản trị', Marketing: 'Marketing' };
const COUNTS = { published: 'đã phát hành', scheduled: 'đã lên lịch', 'in review': 'đang duyệt', changes: 'cần sửa', drafts: 'nháp', gaps: 'tuần trống' };
const ROLE_VI = { admin: 'quản trị viên', director: 'trưởng khoa', provost: 'phòng đào tạo', instructor: 'giảng viên', student: 'sinh viên' };
PATTERNS.unshift(
  [/^Submitted by (.+?) ((?:\d+ (?:min|h|d) ago)|just now)$/, (_, who, t) => `Nộp bởi ${who} ${tv(t)}`], [/^Lecturer, (.+)$/, (_, o) => `Giảng viên, ${tv(o)}`],
  [/^load limit (\d+)h per term \((\d+)h per unit\)$/, 'định mức $1 giờ mỗi học kỳ ($2 giờ mỗi unit)'], [/^(\S+) class lead$/, 'Phụ trách lớp $1'],
  [/^(\S+) (Economics|Accounting|Finance|Management|Marketing) lecturer$/, (_, c, sj) => `Giảng viên ${SUBJ[sj]} lớp ${c}`],
  [/^All programmes are built on (.+) \((\d+) units per year\)$/, (_, f, n) => `Mọi ngành đều xây trên ${tv(f)} (${n} unit mỗi năm)`], [/^Intake (\S+)$/, 'Khóa $1'],
  [/^(\d+) units per year$/, '$1 unit mỗi năm'], [/^(\d+) core subjects × (\d+) units$/, '$1 môn cốt lõi × $2 unit'], [/^(\d+) blocks$/, '$1 khối'],
  [/^Build the year plan for (.+) from the (.+) skeleton\. Changes apply to the next intake after approval\.$/, (_, p, f) => `Xây kế hoạch năm cho ${tv(p)} từ khung ${tv(f)}. Thay đổi áp dụng cho khóa tuyển sinh tiếp theo sau khi được duyệt.`],
  [/^(\d+)\/(\d+) weeks filled · highlighted weeks differ from the current curriculum \((.+)\)$/, (_, a, b, i) => `Đã xếp ${a}/${b} tuần · tuần được tô khác với chương trình hiện tại (${tv(i)})`],
  [/^(\d+) units \(framework (\d+)\)$/, '$1 unit (khung: $2)'],
  [/^(\d+) (published|scheduled|in review|changes|drafts|gaps)$/, (_, n, k) => `${n} ${COUNTS[k]}`], [/^(.+) studied$/, 'đã học $1'],
  [/^(\d+)% used$/, 'đã dùng $1%'], [/^expires (\w+) (\d{4})$/, (_, m, y) => `hết hạn ${MONTHS[m] || m}/${y}`], [/^of (\d+) accounts$/, 'trên $1 tài khoản'],
  [/^(\d+) total this term$/, '$1 lượt trong học kỳ'], [/^Signed in \((\w+)\)$/, (_, r) => `Đăng nhập (${ROLE_VI[r] || r})`], [/^(\d+) accounts$/, '$1 tài khoản'],
  [/^(\d+) actions?$/, '$1 thao tác'], [/^(\d+) available$/, 'còn $1'], [/^(\d+) days remaining$/, 'còn $1 ngày'], [/^(\d+) events$/, '$1 sự kiện'],
  [/^Submitted "(.+)" for approval$/, 'Đã nộp "$1" để duyệt'], [/^Submitted (.+) curriculum \(intake (\S+)\) for approval$/, (_, p, i) => `Đã nộp chương trình ${tv(p)} (khóa ${i}) để duyệt`],
  [/^Requested changes on "(.+)"$/, 'Yêu cầu sửa "$1"'], [/^Week (\d+) started$/, 'Bắt đầu tuần $1'], [/^(\d+) lessons published$/, 'đã phát hành $1 bài'], [/^([^·]+) opened$/, 'đã mở $1'],
);

// lesson pages, presenter, lesson quality, exam paper check
Object.assign(VI, { 'Page': 'Trang', 'New page': 'Trang mới', 'Quick check': 'Câu hỏi nhanh', 'Not quite.': 'Chưa đúng.', 'This page is empty': 'Trang này còn trống',
  'Add text, images, tables or a quick check.': 'Thêm chữ, hình ảnh, bảng hoặc câu hỏi nhanh.', 'Show answer': 'Hiện đáp án', 'No slides': 'Chưa có slide', 'Close': 'Đóng',
  'Edit page': 'Soạn trang', 'Open page': 'Xem trang', 'Present': 'Trình chiếu', 'Phone preview': 'Xem trên điện thoại', 'How students see this page on a phone': 'Sinh viên sẽ thấy trang này trên điện thoại như sau',
  'Save page': 'Lưu trang', 'Page saved': 'Đã lưu trang', 'Not found': 'Không tìm thấy', 'Back to lessons': 'Về danh sách bài giảng',
  'Drag tiles from the left onto the page, drag a tile to move it, click a tile to edit it.': 'Kéo ô từ bên trái vào trang, kéo ô để đổi chỗ, bấm vào ô để sửa.',
  'Read only — this lesson is not a draft.': 'Chỉ xem — bài này không còn là bản nháp.', 'Drag onto the page or click': 'Kéo vào trang hoặc bấm',
  'Each row of tiles becomes one slide when you present.': 'Khi trình chiếu, mỗi hàng ô thành một slide.', 'Click to edit': 'Bấm để sửa', 'Narrower': 'Hẹp lại', 'Wider': 'Rộng ra',
  'Taller / shorter': 'Cao / thấp', 'Duplicate': 'Nhân bản', 'Edit': 'Sửa', 'Delete': 'Xóa', 'Heading': 'Tiêu đề', 'Subheading': 'Tiêu đề phụ', 'Bold': 'In đậm', 'Italic': 'In nghiêng',
  'Bullet list': 'Danh sách gạch đầu dòng', 'Numbered list': 'Danh sách đánh số', 'Formatting': 'Định dạng', 'Blank line = new paragraph': 'Dòng trống = đoạn mới', 'Preview': 'Xem trước',
  'Fit': 'Cách hiển thị', 'Fill the tile (may crop)': 'Lấp đầy ô (có thể bị cắt)', 'Show the whole image': 'Hiện toàn bộ ảnh', 'Image file (PNG, JPG, SVG · max 8 MB)': 'Tệp ảnh (PNG, JPG, SVG · tối đa 8 MB)',
  'Question': 'Câu hỏi', 'Options — select the correct one': 'Phương án — chọn phương án đúng', 'Optional': 'Không bắt buộc', 'The correct option cannot be empty': 'Phương án đúng không được để trống',
  'Write at least two options': 'Viết ít nhất hai phương án', 'Delete this tile?': 'Xóa ô này?', 'It disappears from the page when you save.': 'Ô sẽ biến mất khỏi trang khi bạn lưu.',
  'Discard changes?': 'Bỏ các thay đổi?', 'The page goes back to its last saved version.': 'Trang quay về bản đã lưu gần nhất.', 'Questions cannot be duplicated — add a new one': 'Không nhân bản được câu hỏi — hãy thêm câu mới',
  'Present the saved version?': 'Trình chiếu bản đã lưu?', 'You have unsaved changes. The presentation shows the last saved page.': 'Bạn có thay đổi chưa lưu. Trình chiếu sẽ dùng bản đã lưu gần nhất.',
  'Present anyway': 'Vẫn trình chiếu', 'Page · empty — click Edit page': 'Trang · trống — bấm Soạn trang', 'Discard': 'Hủy thay đổi', 'Full screen': 'Toàn màn hình', 'Previous slide': 'Slide trước', 'Next slide': 'Slide sau',
  'Lesson quality': 'Chất lượng bài giảng', 'Checklist used by reviewers': 'Tiêu chí người duyệt sử dụng', 'Learning outcome stated': 'Có mục tiêu học tập',
  'Write in "Summary for students" what they will be able to do.': 'Ghi vào "Tóm tắt cho sinh viên" điều các em sẽ làm được sau bài.', 'Checks understanding': 'Có kiểm tra mức hiểu bài',
  'Add a Practice check block or a Quick check on a page.': 'Thêm khối Luyện tập hoặc Câu hỏi nhanh trên một trang.', 'Length fits one class session': 'Thời lượng vừa một buổi học',
  'Under 40 minutes — add an activity.': 'Dưới 40 phút — thêm một hoạt động.', 'Over 120 minutes — split it or shorten blocks.': 'Trên 120 phút — tách bài hoặc rút ngắn các khối.',
  'Changes activity at least every 30 min': 'Đổi hoạt động ít nhất mỗi 30 phút', 'Uses a real Vietnamese example': 'Có ví dụ thực tế ở Việt Nam', 'Add a case or an example from a Vietnamese business.': 'Thêm tình huống hoặc ví dụ từ một doanh nghiệp Việt Nam.',
  'Has a visual: image, data or simulation': 'Có minh họa: hình ảnh, số liệu hoặc mô phỏng', 'Add a page with an image or data table, or a simulation block.': 'Thêm một trang có hình ảnh hoặc bảng số liệu, hoặc một khối mô phỏng.',
  'Where students struggle': 'Sinh viên đang yếu ở đâu', 'All classes': 'Tất cả lớp', 'this unit': 'unit này', 'Revisit these in class:': 'Nên ôn lại trên lớp:', 'Add worked problem': 'Thêm bài giải mẫu',
  'Add practice check': 'Thêm câu hỏi luyện tập', 'No weak spots yet — fewer than 3 answers per question, or students score 60 % or more.': 'Chưa thấy điểm yếu — mỗi câu có dưới 3 lượt trả lời, hoặc sinh viên đúng từ 60 % trở lên.',
  'Answer sent — watch the screen for the result.': 'Đã gửi đáp án — xem kết quả trên màn hình lớp.', 'Answer sent': 'Đã gửi đáp án', 'Join the live class first': 'Hãy vào lớp trực tuyến trước',
  'This question is no longer on screen': 'Câu hỏi này không còn trên màn hình', 'Choose an answer': 'Hãy chọn một đáp án', 'answered ·': 'đã trả lời ·', 'correct': 'đúng',
  'Too easy': 'Quá dễ', 'Too hard': 'Quá khó', 'An option nobody picks': 'Có phương án không ai chọn', 'Negative wording': 'Câu hỏi phủ định', '"All / none of the above"': '"Tất cả / không có ý nào ở trên"',
  'Review this question': 'Nên xem lại câu này', 'Paper check': 'Kiểm tra đề', 'Time, item quality and versions': 'Thời gian, chất lượng câu hỏi và các mã đề',
  'Add questions to estimate the working time.': 'Thêm câu hỏi để ước tính thời gian làm bài.', 'No item warnings': 'Không có câu nào cần lưu ý',
  'Printed versions — B shuffles question and option order:': 'Bản in — Đề B đảo thứ tự câu hỏi và phương án:', 'Version A': 'Đề A', 'Version B': 'Đề B', 'Key A': 'Đáp án A', 'Key B': 'Đáp án B',
  'No suitable questions left in the bank — write new ones': 'Ngân hàng không còn câu phù hợp — hãy soạn câu mới',
  'Chosen to match the blueprint by subject and thinking level, preferring questions with medium difficulty that were not in another locked paper.': 'Chọn theo ma trận đề (môn và mức tư duy), ưu tiên câu có độ khó vừa phải và chưa dùng trong đề đã khóa khác.',
  'Add to paper': 'Thêm vào đề', 'remove or simplify questions.': 'nên bớt hoặc đơn giản hóa câu hỏi.', 'students will finish early.': 'sinh viên sẽ làm xong sớm.' });
PATTERNS.unshift(
  [/^Page · (\d+) tiles · (\d+) slides$/, 'Trang · $1 ô · $2 slide'], [/^Slide (\d+) \/ (\d+)$/, 'Slide $1/$2'], [/^Waiting for answers · (\d+) joined$/, 'Đang chờ trả lời · $1 đã vào lớp'],
  [/^(Add|Edit) · (.+)$/, (_, a, k) => `${a === 'Add' ? 'Thêm' : 'Sửa'} · ${tv(k)}`],
  [/^(\d+) minutes of reading or lecture in a row — insert a discussion, calculation or check\.$/, '$1 phút đọc hoặc nghe giảng liên tục — chèn thảo luận, bài tính hoặc câu hỏi.'],
  [/^(\S+) · units taught so far$/, '$1 · các unit đã dạy'], [/^(\d+)% correct$/, '$1% đúng'], [/^(\d+) answers$/, '$1 lượt trả lời'], [/^(\d+) options nobody picks$/, '$1 phương án không ai chọn'],
  [/^About (\d+) min of work for a (\d+)-minute paper\.$/, 'Ước tính $1 phút làm bài cho đề $2 phút.'], [/^About (\d+) min of work for a (\d+)-minute paper$/, 'Ước tính $1 phút làm bài cho đề $2 phút'],
  [/^(\d+) question\(s\) to review$/, '$1 câu nên xem lại'], [/^Fill (\d+) gap\(s\) from the bank$/, 'Lấp $1 chỗ trống từ ngân hàng'], [/^Add (\d+) question\(s\)\?$/, 'Thêm $1 câu hỏi?'],
  [/^(\d+) question\(s\) added$/, 'Đã thêm $1 câu hỏi'],
);
Object.assign(VI, { 'Drag onto the canvas or click to add': 'Kéo vào khung soạn hoặc bấm để thêm' });
PATTERNS.unshift([/^(\d+) min total$/, 'tổng $1 phút'], [/^(\d+)\/(\d+) completed$/, 'đã xong $1/$2'], [/^planned (\d+) min$/, 'dự kiến $1 phút']);

// lecturer-written exam papers, approved by the Dean
Object.assign(VI, { 'Waiting for the Dean': 'Chờ Trưởng khoa duyệt', 'Your approval': 'Bạn cần duyệt', 'Send to the Dean': 'Gửi Trưởng khoa duyệt', 'Ask co-editors to review': 'Mời người cùng soạn xem lại',
  'Request changes': 'Yêu cầu sửa', 'Approve & lock': 'Duyệt & khóa đề', 'Send to the Dean?': 'Gửi Trưởng khoa duyệt?', 'Editing is locked while the Dean reviews the paper.': 'Đề sẽ bị khóa chỉnh sửa trong lúc Trưởng khoa xem.',
  'Send': 'Gửi', 'Sent to the Dean for approval': 'Đã gửi Trưởng khoa duyệt', 'The lecturer sees your note and can edit the paper again.': 'Giảng viên sẽ thấy ghi chú và được sửa đề lại.',
  'What should change?': 'Cần sửa gì?', 'Changes requested:': 'Yêu cầu sửa:', 'Waiting for the Dean’s approval. Editing is locked until the Dean responds.': 'Đang chờ Trưởng khoa duyệt. Đề bị khóa chỉnh sửa đến khi Trưởng khoa phản hồi.',
  'Approved by the Dean. The Dean schedules it for your classes.': 'Trưởng khoa đã duyệt. Trưởng khoa sẽ lên lịch thi cho các lớp của bạn.',
  'Write a paper for your classes, invite colleagues if you like, then send it to the Dean. The Dean approves and schedules it.': 'Soạn đề cho lớp của bạn, có thể mời đồng nghiệp cùng soạn, rồi gửi Trưởng khoa. Trưởng khoa duyệt và lên lịch thi.',
  'Build exam papers with your lecturers: set the blueprint, invite co-editors, review together, lock and schedule. Papers written by lecturers come here for your approval.': 'Soạn đề thi cùng giảng viên: lập ma trận đề, mời người cùng soạn, duyệt chung, khóa và lên lịch. Đề do giảng viên soạn cũng gửi về đây để bạn duyệt.',
  'Create a paper, or wait for a Dean to invite you.': 'Hãy tạo đề, hoặc chờ Trưởng khoa mời bạn cùng soạn.', 'You do not teach a class in this programme': 'Bạn không dạy lớp nào trong ngành này',
  'Only the Dean of this programme can approve this paper': 'Chỉ Trưởng khoa của ngành này được duyệt đề', 'The lecturer has not submitted this paper yet': 'Giảng viên chưa gửi đề này',
  'Only the Dean can unlock an approved paper': 'Chỉ Trưởng khoa được mở khóa đề đã duyệt', 'The Dean schedules papers written by lecturers': 'Trưởng khoa lên lịch cho đề do giảng viên soạn',
  'You can only choose classes you teach': 'Bạn chỉ được chọn lớp mình dạy', 'Explain what needs to change': 'Hãy ghi rõ cần sửa gì', 'This paper is not waiting for approval': 'Đề này không ở trạng thái chờ duyệt',
  'Exam paper awaiting approval': 'Đề thi chờ duyệt', 'Exam changes requested': 'Đề thi cần sửa', 'Exam paper approved': 'Đề thi đã được duyệt', 'Paper locked — ready to schedule': 'Đã khóa đề — sẵn sàng lên lịch' });
PATTERNS.unshift([/^(.+) sent this paper for your approval\. Check it, then approve or request changes\.$/, '$1 đã gửi đề này cho bạn duyệt. Hãy xem lại rồi duyệt hoặc yêu cầu sửa.']);
Object.assign(VI, { 'Studio': 'Soạn đề thi', 'Paper approved and locked': 'Đã duyệt và khóa đề' });
PATTERNS.unshift([/^Approved and locked "(.+)"$/, 'Đã duyệt và khóa "$1"'], [/^Submitted "(.+)" for approval$/, 'Đã nộp "$1" để duyệt']);

// student "what to do now"
Object.assign(VI, { 'What to do now': 'Việc cần làm', 'Do now': 'Làm ngay', 'This week': 'Tuần này', 'Catch up': 'Cần bù', 'Coming up': 'Sắp tới',
  'Live class now': 'Lớp trực tuyến đang diễn ra', 'Assessment open': 'Bài kiểm tra đang mở', 'Opens soon': 'Sắp mở', "This week's lesson": 'Bài học tuần này',
  'Missed — counted as 0. Talk to your lecturer.': 'Đã bỏ lỡ — tính 0 điểm. Hãy trao đổi với giảng viên.', 'Join': 'Vào lớp', 'Start': 'Bắt đầu', 'Resume': 'Học tiếp', 'View': 'Xem',
  'All caught up': 'Bạn đã làm xong hết', 'Nothing left for this week': 'Tuần này không còn việc nào', 'Revise in the workbook or read ahead in My course.': 'Ôn lại trong Sách bài tập hoặc học trước trong Khóa học của tôi.' });
PATTERNS.unshift([/^(\d+) things to do$/, '$1 việc cần làm'], [/^(\d+) urgent$/, '$1 việc gấp'], [/^Week (\d+) lesson not finished$/, 'Bài tuần $1 chưa học xong']);
Object.assign(VI, { 'Talk to your instructor or catch up on the items below.': 'Hãy trao đổi với giảng viên hoặc làm bù các việc bên dưới.', 'Finish earlier weeks to keep up with the class': 'Học xong các tuần trước để theo kịp lớp', 'View all': 'Xem tất cả', 'You may need support.': 'Bạn có thể cần hỗ trợ.' });
PATTERNS.unshift([/^(\d+) more unfinished lessons$/, 'Còn $1 bài chưa học xong']);

// class codes: open, join, cancel
Object.assign(VI, { 'Open a class': 'Tạo lớp', 'Open a new class': 'Tạo lớp mới', 'You get a class code to send to students. The Dean is told and assigns lecturers to the subjects.': 'Bạn nhận một mã lớp để gửi sinh viên. Trưởng khoa được báo và sẽ phân công giảng viên cho từng môn.',
  'Intake': 'Khóa', 'Note for the Dean (optional)': 'Ghi chú cho Trưởng khoa (không bắt buộc)', 'e.g. evening class, 40 students expected': 'VD: lớp buổi tối, dự kiến 40 sinh viên',
  "The class follows the programme's current 16-week curriculum. You are its class lead.": 'Lớp học theo chương trình 16 tuần hiện hành của ngành. Bạn là giảng viên phụ trách lớp.', 'Open class': 'Tạo lớp',
  'Send the code or the link to your students': 'Gửi mã hoặc đường link cho sinh viên', 'Class code': 'Mã lớp', 'Class link': 'Link lớp', 'Copy link': 'Chép link', 'Copy code': 'Chép mã', 'Copied': 'Đã chép',
  'Select the text and copy it': 'Hãy bôi đen và chép thủ công', 'Done': 'Xong', 'Cancel class': 'Hủy lớp', 'Keep the class': 'Giữ lớp', 'Code': 'Mã lớp', 'Cancel': 'Hủy', 'New': 'Mới',
  'Class code — send it to students': 'Mã lớp — gửi cho sinh viên', 'Use this when a class does not open, for example too few students.': 'Dùng khi lớp không mở được, ví dụ không đủ sinh viên.',
  'Draft lessons of this class are deleted. Students who use the old code or link are taken to the class you choose.': 'Bài giảng nháp của lớp sẽ bị xóa. Sinh viên dùng mã hoặc link cũ sẽ được đưa vào lớp bạn chọn.',
  'Join a class': 'Vào lớp bằng mã', 'Type the 6-character code your lecturer sent you, or open their link.': 'Nhập mã 6 ký tự giảng viên gửi, hoặc mở link lớp.', 'Find class': 'Tìm lớp',
  'You are already in this class.': 'Bạn đã ở trong lớp này.', 'Moved from a cancelled class': 'Chuyển từ lớp đã hủy', 'New classes': 'Lớp mới mở',
  'Opened by lecturers with a class code. Assign lecturers to each subject below.': 'Do giảng viên tạo bằng mã lớp. Hãy phân công giảng viên cho từng môn ở bảng bên dưới.', 'Opened by': 'Người tạo',
  'Subjects without a lecturer': 'Môn chưa có giảng viên', 'All assigned': 'Đã phân công đủ', 'No class has this code. Check it with your lecturer.': 'Không có lớp nào dùng mã này. Hãy hỏi lại giảng viên.',
  'Intake looks like K50': 'Khóa có dạng K50', 'Only the lecturer who opened the class or the Dean can cancel it': 'Chỉ giảng viên tạo lớp hoặc Trưởng khoa được hủy lớp',
  'This class already has approved lessons — it cannot be cancelled': 'Lớp đã có bài giảng được duyệt — không hủy được', 'Students in this class have already taken an assessment — it cannot be cancelled': 'Sinh viên lớp này đã làm bài kiểm tra — không hủy được',
  'Choose the class to move students to': 'Hãy chọn lớp để chuyển sinh viên sang', 'Choose a different class': 'Hãy chọn lớp khác', 'Class cancelled': 'Đã hủy lớp', 'New class opened': 'Có lớp mới được mở',
  'Student joined your class': 'Có sinh viên vào lớp', 'Your class was moved': 'Lớp của bạn đã được chuyển', 'Students moved to your class': 'Có sinh viên chuyển vào lớp của bạn' });
PATTERNS.unshift(
  [/^New classes · (\d+)$/, 'Lớp mới mở · $1'], [/^Class code · (.+)$/, 'Mã lớp · $1'], [/^Cancel (.+)\?$/, 'Hủy lớp $1?'], [/^Join (.+)$/, 'Vào lớp $1'],
  [/^(\d+) student\(s\) in the class so far\.$/, 'Hiện lớp có $1 sinh viên.'], [/^Move its (\d+) student\(s\) and its code to$/, 'Chuyển $1 sinh viên và mã lớp sang'],
  [/^Class (.+) created$/, 'Đã tạo lớp $1'], [/^You are now in (.+)$/, 'Bạn đã vào lớp $1'], [/^You are already in (.+)$/, 'Bạn đã ở lớp $1'], [/^Cancelled — students and code now go to (.+)$/, 'Đã hủy — sinh viên và mã lớp chuyển sang $1'],
);

Object.assign(VI, { 'Current class:': 'Lớp hiện tại:', 'Joining moves you out of your current class.': 'Vào lớp mới sẽ chuyển bạn ra khỏi lớp hiện tại.' });
Object.assign(VI, { 'Group project': 'Dự án nhóm', 'Group projects': 'Dự án nhóm' });
PATTERNS.unshift([/^Case · (\d+) questions$/, 'Tình huống · $1 câu hỏi']);
Object.assign(VI, { 'Add a header line and at least one row': 'Thêm dòng tiêu đề và ít nhất một dòng dữ liệu', 'Add a title': 'Hãy nhập tiêu đề', 'Add a title before submitting': 'Hãy nhập tiêu đề trước khi gửi',
  'Add an audio file or a transcript': 'Thêm tệp âm thanh hoặc lời thoại', 'Add at least one block': 'Thêm ít nhất một khối', 'Add at least one block before submitting': 'Thêm ít nhất một khối trước khi gửi',
  'Add at least one tile': 'Thêm ít nhất một ô', 'Add blocks from the palette to build the lesson.': 'Thêm khối từ danh sách bên trái để soạn bài.', 'Add from the question bank': 'Thêm từ ngân hàng câu hỏi',
  'Add one from the Library page.': 'Thêm ở trang Thư viện.', 'Add questions first': 'Hãy thêm câu hỏi trước', 'Add to a lesson': 'Thêm vào bài giảng', 'Add to the library': 'Thêm vào thư viện',
  'Not yet. Check your working and try again.': 'Chưa đúng. Kiểm tra lại cách làm và thử lần nữa.',
  'Case studies, activities, worksheets and practical sessions can be added to any lesson.': 'Tình huống, dự án nhóm, hoạt động, phiếu bài tập và tiết thực hành đều thêm được vào bài giảng.' });
// sign-in page
Object.assign(VI, { 'This is a demo environment. Choose an account to continue — single sign-on with UEH accounts will replace this screen.': 'Đây là bản demo. Hãy chọn một tài khoản để vào — sau này sẽ đăng nhập bằng tài khoản UEH.',
  'Learning management & academic operations for UEH University — course delivery, approvals, assessment and analytics in one place.': 'Hệ thống quản lý học tập online learning.',
  'Correct!': 'Đúng rồi!', 'UEH Economics Foundation': 'Khung Nền tảng Kinh tế UEH' });
PATTERNS.unshift([/^(\d+) programmes$/, '$1 ngành'], [/^Demo week (\d+) of (\d+)\. Data is stored only in this browser\.$/, 'Demo đang ở tuần $1/$2. Dữ liệu chỉ lưu trong trình duyệt này.']);

// simple interface for lecturers
Object.assign(VI, { 'My classes': 'Lớp của tôi', 'Prepare lessons': 'Soạn bài', 'More': 'Thêm', 'Full interface': 'Giao diện đầy đủ', 'Simple interface': 'Giao diện đơn giản',
  'What is this page for?': 'Trang này dùng để làm gì?', 'Here is what needs you today.': 'Đây là những việc hôm nay cần thầy cô.', 'To do': 'Việc cần làm', 'When you can': 'Khi rảnh',
  'Nothing is waiting for you': 'Hiện không có việc nào chờ', 'Prepare a lesson ahead, or look at how your classes are doing.': 'Thầy cô có thể soạn trước bài tuần tới, hoặc xem tình hình các lớp.',
  'Prepare a lesson': 'Soạn bài', 'For one of your classes': 'Cho một lớp của thầy cô', 'Show a lesson in class': 'Trình chiếu bài trên lớp', 'Get a code for students': 'Lấy mã lớp gửi sinh viên',
  'Open': 'Mở', 'Fix': 'Sửa bài', 'Mark': 'Chấm', 'Prepare': 'Soạn ngay', 'Continue': 'Làm tiếp', 'Grade': 'Chấm điểm', 'Review': 'Xem lại',
  'Live class is open': 'Lớp trực tuyến đang mở', 'The Dean asked for changes': 'Trưởng khoa yêu cầu sửa', 'Students are waiting for feedback': 'Sinh viên đang chờ kết quả',
  'Marked with the rubric in the gradebook': 'Chấm theo rubric trong sổ điểm', 'Exam paper waiting for your sign-off': 'Đề thi đang chờ thầy cô ký duyệt',
  'Low grade, low activity or missed assessments': 'Điểm thấp, ít học hoặc bỏ lỡ bài kiểm tra',
  'Your lessons, week by week.': 'Bài giảng của thầy cô, theo từng tuần.', 'My lessons': 'Bài giảng của tôi', 'New lesson': 'Bài giảng mới', 'Open a class first': 'Hãy tạo lớp trước',
  'Want a lesson you can reuse every term?': 'Muốn có bài dùng lại mỗi học kỳ?', 'Choose class and week': 'Chọn lớp và tuần', 'Build the lesson': 'Soạn nội dung', 'Send to the Dean': 'Gửi Trưởng khoa duyệt',
  'Add to the lesson:': 'Thêm vào bài:', 'Content page': 'Soạn bài mới', 'Questions': 'Câu hỏi', 'From the library': 'Lấy từ thư viện', 'Lesson content': 'Nội dung bài giảng',
  'Move up': 'Đưa lên', 'Move down': 'Đưa xuống', 'Preview as student': 'Xem như sinh viên', 'Remove': 'Xóa khỏi bài', 'This lesson is empty': 'Bài này còn trống',
  'Use the buttons above to add the first part.': 'Dùng các nút phía trên để thêm phần đầu tiên.', 'History': 'Lịch sử', 'min': 'phút',
  'Mark answers one after another. Each answer shows the model answer and the marking points.': 'Chấm lần lượt từng bài. Mỗi bài có sẵn đáp án mẫu và các ý chấm điểm.',
  'answers waiting for you': 'bài đang chờ thầy cô chấm', 'After you save a mark, the next answer opens by itself.': 'Lưu điểm xong, bài tiếp theo sẽ tự mở.',
  'New answers appear here as students submit them.': 'Bài mới sẽ hiện ở đây khi sinh viên nộp.', 'Start marking': 'Bắt đầu chấm', 'Gradebook by class': 'Sổ điểm theo lớp',
  'Open the gradebook below and press Grade next to the student.': 'Mở sổ điểm bên dưới rồi bấm Chấm điểm cạnh tên sinh viên.',
  'Cases & projects': 'Tình huống & dự án', 'Other materials': 'Tài liệu khác', 'Extracts': 'Trích đoạn', 'Nothing here yet': 'Chưa có gì ở đây',
  // one-sentence page help
  'This page lists what needs you today, most urgent first. Press the button on a line to do that job.': 'Trang này liệt kê việc hôm nay cần thầy cô, việc gấp nhất ở trên. Bấm nút ở cuối mỗi dòng để làm việc đó.',
  'Your classes with their results. Press a class to see its students and grades. The code on each card is what students type to join.': 'Các lớp của thầy cô kèm kết quả. Bấm vào lớp để xem sinh viên và điểm. Mã trên mỗi thẻ là mã sinh viên nhập để vào lớp.',
  'All your lessons by week. Press New lesson to prepare one; press Edit to continue a draft.': 'Tất cả bài giảng theo tuần. Bấm "Bài giảng mới" để soạn; bấm "Sửa" để làm tiếp bài nháp.',
  'Build the lesson from top to bottom: add content, activities and questions, then press Send to the Dean. Students see it only after approval.': 'Soạn bài từ trên xuống: thêm nội dung, hoạt động và câu hỏi, rồi bấm gửi Trưởng khoa. Sinh viên chỉ thấy bài sau khi được duyệt.',
  'Press Start marking to mark answers one after another. The full gradebook for each class is underneath.': 'Bấm "Bắt đầu chấm" để chấm lần lượt từng bài. Sổ điểm đầy đủ của từng lớp nằm bên dưới.',
  'Show a published lesson in class. Students join with the PIN and can answer quick questions on their phones.': 'Trình chiếu bài đã phát hành trên lớp. Sinh viên vào bằng mã PIN và trả lời câu hỏi nhanh trên điện thoại.',
  'Books, case studies and other materials you can add to a lesson.': 'Sách, tình huống và các tài liệu khác có thể thêm vào bài giảng.',
  'A 16-week plan for a whole programme, built from reusable lessons. Most lecturers do not need this every week.': 'Kế hoạch 16 tuần cho cả ngành, ghép từ các bài mẫu. Phần lớn thầy cô không cần dùng hằng tuần.',
  "Quizzes and tests for your own classes. They do not need the Dean's approval.": 'Bài kiểm tra cho lớp của thầy cô. Không cần Trưởng khoa duyệt.',
  'Write an exam paper, alone or with colleagues, then send it to the Dean, who approves and schedules it.': 'Soạn đề thi, một mình hoặc cùng đồng nghiệp, rồi gửi Trưởng khoa duyệt và lên lịch thi.',
  'The exercises students practise with, and the answers of your classes.': 'Bài tập sinh viên luyện, kèm bài làm của các lớp thầy cô dạy.',
  'The whole term week by week: lessons and assessments of your classes.': 'Cả học kỳ theo từng tuần: bài giảng và bài kiểm tra của các lớp.' });
PATTERNS.unshift(
  [/^Mark (\d+) answers$/, 'Chấm $1 bài'], [/^Prepare the week (\d+) lesson$/, 'Soạn bài tuần $1'], [/^Week (\d+) draft not sent to the Dean yet$/, 'Bài nháp tuần $1 chưa gửi Trưởng khoa'],
  [/^Grade (\d+) case reports$/, 'Chấm $1 báo cáo tình huống'], [/^(\d+) students need support$/, '$1 sinh viên cần hỗ trợ'], [/^(\d+) case reports to grade\.$/, 'Có $1 báo cáo tình huống cần chấm.'],
  [/^Ready-made lessons to reuse$/, 'Bài mẫu có sẵn để dùng lại'], [/^Lesson quality: (\d+)\/(\d+) — see tips$/, 'Chất lượng bài: $1/$2 — xem gợi ý'], [/^Where students struggle$/, 'Sinh viên đang yếu ở đâu'],
  [/^(\d+) blocks$/, '$1 phần'],
);
Object.assign(VI, { 'Options': 'Tùy chọn', 'Unit (from the programme curriculum)': 'Unit (theo chương trình của ngành)', 'Summary for students': 'Tóm tắt cho sinh viên', 'Lesson settings': 'Thông tin bài giảng', 'Submit for approval': 'Gửi Trưởng khoa duyệt', 'Delete draft': 'Xóa bản nháp' });
Object.assign(VI, { 'This week and the weeks ahead': 'Tuần này và các tuần tới', 'Lessons already taught': 'Bài đã dạy', 'No class lessons yet': 'Chưa có bài giảng nào' });

// ESP repositioning: English in a business context, two content sources
Object.assign(VI, { 'English for Economics & Business · Level 1 (B1)': 'Tiếng Anh Kinh tế & Kinh doanh · Cấp độ 1 (B1)', 'English for Economics & Business': 'Tiếng Anh Kinh tế & Kinh doanh',
  'Level 1 (B1)': 'Cấp độ 1 (B1)', 'UEH English for Economics & Business · Level 1': 'Khung Tiếng Anh Kinh tế & Kinh doanh UEH · Cấp độ 1', 'UEH English for Economics & Business': 'Khung Tiếng Anh Kinh tế & Kinh doanh UEH', 'Level 1': 'Cấp độ 1',
  'Reading & input': 'Đọc & ngữ liệu', 'Describe the chart': 'Mô tả biểu đồ', 'Speaking task': 'Bài nói', 'Language focus': 'Trọng tâm ngôn ngữ', 'Coursebook extract': 'Trích đoạn giáo trình',
  'Vocabulary & grammar': 'Từ vựng & ngữ pháp', 'Coursebook': 'Giáo trình', 'UEH': 'UEH', 'By the end of this lesson:': 'Sau bài này:', 'Key words:': 'Từ khóa:',
  'Content sources by unit · coursebook and UEH': 'Nguồn nội dung theo unit · giáo trình và UEH',
  'The UEH syllabus is the backbone. Coursebooks are licensed and read-only; UEH material is written by lecturers and approved by the Dean.': 'Đề cương của UEH là xương sống. Giáo trình có bản quyền và chỉ đọc; nội dung UEH do giảng viên soạn và Trưởng khoa duyệt.',
  'Skills still missing': 'Kỹ năng còn thiếu', 'No coursebook mapped': 'Chưa gắn giáo trình', 'All skills covered': 'Đủ các kỹ năng',
  'Coursebooks under this licence': 'Giáo trình thuộc giấy phép này', 'Licensed content is read-only and disappears for students when the licence ends. UEH material and student results stay.': 'Nội dung có bản quyền chỉ đọc và sẽ ẩn với sinh viên khi hết hạn. Nội dung UEH và kết quả của sinh viên vẫn còn.',
  'Units': 'Unit', 'File': 'Tệp', 'Valid until': 'Hiệu lực đến', 'PDF uploaded': 'Đã tải PDF', 'Not uploaded': 'Chưa tải lên' });
PATTERNS.unshift([/^(\d+) page extracts$/, '$1 trích đoạn'], [/^(\d+) library items$/, '$1 tài liệu thư viện'], [/^Coursebook (\d+)%$/, 'Giáo trình $1%'], [/^UEH (\d+)%$/, 'UEH $1%'],
  [/^(.+) · English for Economics & Business · Level 1 \(B1\)$/, (_, x) => `${tv(x)} · Tiếng Anh Kinh tế & Kinh doanh · Cấp độ 1 (B1)`]);
PATTERNS.unshift([/^(\d+) units · four skills plus vocabulary & grammar · (\d+) exercises$/, '$1 unit · bốn kỹ năng cùng từ vựng & ngữ pháp · $2 bài tập']);
Object.assign(VI, { 'English for Economics & Business · Level 1 (CEFR B1)': 'Tiếng Anh Kinh tế & Kinh doanh · Cấp độ 1 (CEFR B1)' });
Object.assign(VI, { 'Every week you teach in this class already has a lesson. Choose another class, or open the existing lesson from the list to edit it.': 'Mọi tuần thầy cô dạy ở lớp này đều đã có bài. Hãy chọn lớp khác, hoặc mở bài có sẵn trong danh sách để sửa.',
  'Start from the unit template (reading, key words, activity, practice check)': 'Bắt đầu từ bài mẫu của unit (bài đọc, từ khóa, hoạt động, luyện tập)', 'Teaching week': 'Tuần dạy', 'Create draft': 'Tạo bản nháp',
  'Title (optional — defaults to the unit title)': 'Tên bài (không bắt buộc — mặc định là tên unit)', 'Leave blank to use the unit title': 'Để trống để dùng tên unit' });
PATTERNS.unshift([/^(.+) \(free\)$/, '$1 (còn trống)'], [/^(.+) \(has a lesson\)$/, '$1 (đã có bài)'], [/^Unit is now (\S+) — the ready-made blocks were updated$/, 'Unit giờ là $1 — các khối mẫu đã được đổi theo']);

// vocabulary trainer: the word, what kind of word, meaning, how to use it
Object.assign(VI, { 'The word': 'Từ cần học', 'What kind of word': 'Đây là từ loại gì', 'Meaning': 'Nghĩa của từ', 'Use it in a sentence': 'Dùng trong câu',
  'One step at a time: the word, what kind of word it is, what it means, how to use it': 'Học từng bước: mặt chữ, từ loại, nghĩa, rồi cách dùng trong câu',
  'Show the next step': 'Xem bước tiếp theo', 'Previous word': 'Từ trước', 'Next word': 'Từ tiếp theo', 'All words': 'Tất cả từ', 'Listen': 'Nghe phát âm',
  'English:': 'Tiếng Anh:', 'Words that go with it:': 'Các từ hay đi kèm:', 'Now write one sentence of your own with this word.': 'Bây giờ hãy tự viết một câu với từ này.',
  'Not recorded yet': 'Chưa có dữ liệu', 'No key words recorded for this unit yet.': 'Unit này chưa có từ khóa nào.', 'Vocabulary trainer': 'Luyện từ vựng',
  'noun': 'danh từ', 'verb': 'động từ', 'adjective': 'tính từ', 'adverb': 'trạng từ', 'noun phrase': 'cụm danh từ', 'phrase': 'cụm từ' });
PATTERNS.unshift([/^Word (\d+) of (\d+)$/, 'Từ $1/$2'], [/^(\d+) business terms$/, '$1 thuật ngữ kinh doanh']);
PATTERNS.unshift([/^(\d+) business words · learn each one in four steps$/, '$1 từ chuyên ngành · học mỗi từ theo bốn bước']);

// grammar reference: how it is built, when to use it, examples, practice
Object.assign(VI, { 'Grammar': 'Ngữ pháp', 'How it is built': 'Cấu trúc', 'When to use it': 'Khi nào dùng', 'Examples in business': 'Ví dụ trong kinh doanh',
  'Your turn: practise it': 'Đến lượt bạn: luyện tập', 'Show the next step': 'Xem bước tiếp theo', 'Previous point': 'Mục trước', 'Next point': 'Mục tiếp theo',
  'All grammar points': 'Tất cả mục ngữ pháp', 'No grammar points yet': 'Chưa có mục ngữ pháp nào', 'No exercises for this unit yet.': 'Unit này chưa có bài tập.',
  'Check each answer as you go.': 'Làm tới đâu kiểm tra đáp án tới đó.' });
PATTERNS.unshift(
  [/^(\d+) grammar points · one for each unit, with examples and practice$/, '$1 mục ngữ pháp · mỗi unit một mục, kèm ví dụ và bài luyện'],
  [/^(\d+) exercises from (\S+)\. Check each answer as you go\.$/, '$1 bài tập của unit $2. Làm tới đâu kiểm tra đáp án tới đó.'],
  [/^Practice opens when your class reaches (\S+)\.$/, 'Phần luyện tập mở khi lớp học đến unit $1.'],
);
Object.assign(VI, { 'Dark block': 'Ô tô đậm', '= write this word exactly.': '= viết đúng từ này.', 'Dashed block': 'Ô nét đứt', '= put your own word here.': '= thay bằng từ của bạn.' });
