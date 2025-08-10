import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Globe,
  Calendar,
  Building,
  Edit,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userData = useSelector((state)=> state.authSlice.user)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  console.log(userData);
  
  // Mock user data
  // const [userData, setUserData] = useState({
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   email: 'john.doe@company.com',
  //   phone: '+1 (555) 123-4567',
  //   avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  //   role: 'Admin',
  //   department: 'Management',
  //   location: 'New York, NY',
  //   timezone: 'America/New_York',
  //   language: 'English',
  //   bio: 'Experienced e-commerce administrator with 5+ years of experience managing online stores and customer relationships.',
  //   joinedDate: '2023-01-15',
  //   lastLogin: '2024-01-15 10:30:00',
  //   notifications: {
  //     email: true,
  //     push: true,
  //     sms: false,
  //     orderUpdates: true,
  //     customerMessages: true,
  //     systemAlerts: false
  //   }
  // });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData(prev => ({ ...prev, [name]: value }));
  // };

  // const handlePasswordChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswordData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleNotificationChange = (key) => {
  //   setUserData(prev => ({
  //     ...prev,
  //     notifications: {
  //       ...prev.notifications,
  //       [key]: !prev.notifications[key]
  //     }
  //   }));
  // };

  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setUserData(prev => ({ ...prev, avatar: e.target.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleSaveProfile = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
    
  //   // Simulate API call
  //   setTimeout(() => {
  //     toast.success('Profile updated successfully!');
  //     setLoading(false);
  //   }, 1000);
  // };

  // const handleChangePassword = async (e) => {
  //   e.preventDefault();
    
  //   if (passwordData.newPassword !== passwordData.confirmPassword) {
  //     toast.error('New passwords do not match');
  //     return;
  //   }
    
  //   if (passwordData.newPassword.length < 8) {
  //     toast.error('Password must be at least 8 characters long');
  //     return;
  //   }
    
  //   setLoading(true);
    
  //   // Simulate API call
  //   setTimeout(() => {
  //     toast.success('Password changed successfully!');
  //     setPasswordData({
  //       currentPassword: '',
  //       newPassword: '',
  //       confirmPassword: ''
  //     });
  //     setLoading(false);
  //   }, 1000);
  // };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center">
              <div className="relative inline-block">
                {
                  userData?.avatar
                  ?
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover mx-auto mb-4"
                  />
                  :
                  <h2 className="h-24 w-24 rounded-full border bg-green-500 text-white flex justify-center items-center text-3xl mx-auto mb-4">
                    {userData.fullName[0]}
                  </h2>
                }
                <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    // onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {userData.fullName}
              </h2>
              <p className="text-green-600 mb-2">{userData.role}</p>
              <p className="text-sm text-gray-500 mb-4">{userData.department}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{userData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Joined {formatDate(userData.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="card">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 justify-center">
                {[
                  { id: 'personal', label: 'Personal Info', icon: User },
                  { id: 'security', label: 'Security', icon: Shield }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-6">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <form
                //  onSubmit={handleSaveProfile}
                  className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={userData.fullName.split(" ")[0]}
                        // onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={userData.fullName.split(" ")[1]}
                        // onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        // onChange={handleInputChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        // onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={userData.role}
                        // onChange={handleInputChange}
                        className="input-field capitalize"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={userData?.location}
                        // onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={userData.bio}
                        // onChange={handleInputChange}
                        rows={4}
                        className="input-field"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary inline-flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Saving...' : 'Update'}
                    </button>
                  </div>
                </form>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <form 
                // onSubmit={handleChangePassword}
                 className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          // onChange={handlePasswordChange}
                          className="input-field pr-10"
                          required
                        />
                        <button
                          type="button"
                          // onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordData.newPassword}
                          // onChange={handlePasswordChange}
                          className="input-field pr-10"
                          required
                        />
                        <button
                          type="button"
                          // onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          // onChange={handlePasswordChange}
                          className="input-field pr-10"
                          required
                        />
                        <button
                          type="button"
                          // onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Password Requirements</h4>
                        <ul className="mt-2 text-sm text-blue-700 space-y-1">
                          <li>• At least 8 characters long</li>
                          <li>• Include uppercase and lowercase letters</li>
                          <li>• Include at least one number</li>
                          <li>• Include at least one special character</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary inline-flex items-center"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {loading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 