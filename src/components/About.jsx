import User from "./User";
import UserClass from "./Userclass";
import React from "react";
import UserContext from "../utils/UserContext";

// used the Class Components (Older way)

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      stats: {
        restaurants: "50,000+",
        orders: "1M+",
        cities: "100+",
        deliveryTime: "30 min"
      },
      features: [
        {
          id: 1,
          title: "Lightning Fast Delivery",
          description: "Get your favorite food delivered in 30 minutes or less",
          icon: "🚀",
          color: "from-blue-500 to-blue-600"
        },
        {
          id: 2,
          title: "Wide Restaurant Network",
          description: "Choose from 50,000+ restaurants across multiple cities",
          icon: "🏪",
          color: "from-green-500 to-green-600"
        },
        {
          id: 3,
          title: "Real-time Tracking",
          description: "Track your order from kitchen to your doorstep",
          icon: "📍",
          color: "from-purple-500 to-purple-600"
        },
        {
          id: 4,
          title: "Multiple Payment Options",
          description: "Pay via card, wallet, UPI, or cash on delivery",
          icon: "💳",
          color: "from-pink-500 to-pink-600"
        }
      ],
      services: [
        {
          name: "Food Delivery",
          description: "Order from your favorite restaurants",
          icon: "🍕",
          popular: true
        },
        {
          name: "Grocery Delivery",
          description: "Fresh groceries delivered to your door",
          icon: "🛒",
          popular: false
        },
        {
          name: "Medicine Delivery",
          description: "Medicines delivered safely and quickly",
          icon: "💊",
          popular: false
        },
        {
          name: "Instant Delivery",
          description: "Get anything delivered in minutes",
          icon: "⚡",
          popular: true
        }
      ],
      activeTab: "story"
    };
  }

  componentDidMount() {
    //It runs once immediately after the component has been mounted 
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 800);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  renderStats = () => {
    const { stats } = this.state;
    const statItems = [
      { label: "Partner Restaurants", value: stats.restaurants, icon: "🏪", color: "text-orange-600" },
      { label: "Orders Delivered", value: stats.orders, icon: "📦", color: "text-green-600" },
      { label: "Cities Served", value: stats.cities, icon: "🏙️", color: "text-blue-600" },
      { label: "Avg Delivery Time", value: stats.deliveryTime, icon: "⏱️", color: "text-purple-600" }
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100"
          >
            <div className="text-4xl mb-3">{stat.icon}</div>
            <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  renderFeatures = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Yummigo?</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {this.state.features.map((feature) => (
            <div
              key={feature.id}
              className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h4 className="font-bold text-gray-800 mb-3 text-lg">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  renderServices = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Services</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {this.state.services.map((service, index) => (
            <div
              key={index}
              className="relative group p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-all duration-300 border border-orange-100"
            >
              {service.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  Popular
                </div>
              )}
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-3">{service.name}</h4>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  renderMission = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h3>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            At Yummigo, we're revolutionizing the way people discover and enjoy food. Our mission is to 
            connect hungry customers with their favorite restaurants and deliver happiness, one meal at a time.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe that great food should be accessible to everyone, anywhere, anytime. That's why we've 
            built a platform that brings together the best restaurants, fastest delivery, and most convenient 
            ordering experience in one place.
          </p>
        </div>
      </div>
    );
  };

  renderTabContent = () => {
    const { activeTab } = this.state;
    
    switch (activeTab) {
      case "story":
        return (
          <div className="space-y-8">
            {this.renderMission()}
            {this.renderStats()}
            {this.renderFeatures()}
          </div>
        );
      case "services":
        return this.renderServices();
      case "impact":
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Impact</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  🌱
                </div>
                <h4 className="font-bold text-gray-800 mb-3">Supporting Local Businesses</h4>
                <p className="text-gray-600">Empowering 50,000+ restaurants and helping them grow their business digitally.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  👥
                </div>
                <h4 className="font-bold text-gray-800 mb-3">Creating Employment</h4>
                <p className="text-gray-600">Providing livelihood opportunities to thousands of delivery partners across India.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  🚀
                </div>
                <h4 className="font-bold text-gray-800 mb-3">Innovation in Food Tech</h4>
                <p className="text-gray-600">Leading the digital transformation of India's food and grocery ecosystem.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    const { isLoading, activeTab } = this.state;

    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <div className="absolute top-4 left-4 text-2xl">🍕</div>
            </div>
            <p className="text-gray-600 font-medium">Loading delicious content...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
       
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🍕</div>
          <div className="absolute top-32 right-20 text-4xl opacity-20 animate-pulse">🍔</div>
          <div className="absolute bottom-20 left-32 text-5xl opacity-20 animate-bounce delay-300">🍜</div>
          
          <div className="relative max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About <span className="text-yellow-300">Yummigo</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-medium">
              India's favorite food delivery platform connecting you with the best restaurants
            </p>
            <div className="flex justify-center space-x-4 mt-8">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <span className="text-yellow-300">⭐</span>
                <span className="text-black font-semibold ">4.3 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
                <span className="text-green-300">📱</span>
                <span className="font-semibold text-black">10M+ Downloads</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
         
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Hello, Foodie! 👋</h2>
                <UserContext.Consumer>
                  {({ loggedInuser }) => (
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {loggedInuser ? loggedInuser[0].toUpperCase() : '🍕'}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{loggedInuser || 'Food Lover'}</h3>
                        <p className="text-sm text-orange-600 font-medium">Premium Member</p>
                      </div>
                    </div>
                  )}
                </UserContext.Consumer>
              </div>
              <div className="text-right">
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                  <p className="text-2xl font-bold text-orange-600">47</p>
                  <p className="text-xs text-gray-500">This month: 12</p>
                </div>
              </div>
            </div>
          </div>

       
          <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 border border-gray-100">
            <div className="flex space-x-1">
              {[
                { id: "story", label: "Our Story", icon: "📖" },
                { id: "services", label: "Services", icon: "🛍️" },
                { id: "impact", label: "Our Impact", icon: "🌟" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => this.handleTabChange(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          
          <div className="mb-8">
            {this.renderTabContent()}
          </div>

        
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meet Our Founder</h3>
            <div className="max-w-2xl mx-auto">
              <UserClass name={"Mohataseem Khan"} location={"Mumbai, India"} />
              <div className="text-center mt-6 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                <p className="text-gray-600 italic leading-relaxed">
                  "I started Yummigo with a simple dream - to make delicious food accessible to everyone, 
                  everywhere. Our journey from a small startup to India's leading food delivery platform 
                  has been incredible, and we're just getting started!"
                </p>
                <p className="text-orange-600 font-semibold mt-4">- Founder & CEO, Yummigo</p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-4">Hungry? We've Got You Covered! 🍽️</h2>
            <p className="text-xl opacity-90 mb-8">Join millions of food lovers and discover amazing restaurants near you.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>Download App</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors duration-300 flex items-center justify-center space-x-2">
                <span>🍕</span>
                <span>Order Now</span>
              </button>
            </div>
            <div className="flex justify-center space-x-8 mt-8 text-sm opacity-80">
              <div>✅ Free Delivery on ₹199+</div>
              <div>✅ 30-min Delivery</div>
              <div>✅ Live Order Tracking</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;