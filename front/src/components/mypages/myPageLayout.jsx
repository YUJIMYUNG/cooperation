import React from 'react';
import MyPageNav from './myPageNav';

function MyPageLayout({children}) {
    return (
        <div>
            {/* 마이페이지 nav 영역 */}
            <div>
                <MyPageNav />
            </div>

            {/* 변경되는 component 영역 */}
            <div>
                {children}
            </div>
        </div>
    );
}

export default MyPageLayout;