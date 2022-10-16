<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex mb-3 justify-content-between">
          <div>
            <span class="block mb-3 font-medium text-gray-500">Orders</span>
            <div class="text-xl font-medium text-gray-900">152</div>
          </div>
          <div
            class="flex items-center justify-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="text-xl text-blue-500 pi pi-shopping-cart"></i>
          </div>
        </div>
        <span class="font-medium text-green-500">24 new </span>
        <span class="text-gray-500">since last visit</span>
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex mb-3 justify-content-between">
          <div>
            <span class="block mb-3 font-medium text-gray-500">Revenue</span>
            <div class="text-xl font-medium text-gray-900">$2.100</div>
          </div>
          <div
            class="flex items-center justify-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="text-xl text-orange-500 pi pi-map-marker"></i>
          </div>
        </div>
        <span class="font-medium text-green-500">%52+ </span>
        <span class="text-gray-500">since last week</span>
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex mb-3 justify-content-between">
          <div>
            <span class="block mb-3 font-medium text-gray-500">Customers</span>
            <div class="text-xl font-medium text-gray-900">28441</div>
          </div>
          <div
            class="flex items-center justify-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="text-xl pi pi-inbox text-cyan-500"></i>
          </div>
        </div>
        <span class="font-medium text-green-500">520 </span>
        <span class="text-gray-500">newly registered</span>
      </div>
    </div>
    <div class="w-full lg:w-6/12 xl:w-3/12">
      <div class="mb-0 card">
        <div class="flex mb-3 justify-content-between">
          <div>
            <span class="block mb-3 font-medium text-gray-500">Comments</span>
            <div class="text-xl font-medium text-gray-900">152 Unread</div>
          </div>
          <div
            class="flex items-center justify-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="text-xl text-purple-500 pi pi-comment"></i>
          </div>
        </div>
        <span class="font-medium text-green-500">85 </span>
        <span class="text-gray-500">responded</span>
      </div>
    </div>

    <div class="w-full xl:w-1/2">
      <div class="card">
        <h5>Recent Sales</h5>
        <DataTable
          :value="products"
          :rows="5"
          :paginator="true"
          responsive-layout="scroll"
        >
          <Column style="width: 15%">
            <template #header> Image </template>
            <template #body="slotProps">
              <img
                :src="'images/product/' + slotProps.data.image"
                :alt="slotProps.data.image"
                width="50"
                class="shadow-2"
              />
            </template>
          </Column>
          <Column
            field="name"
            header="Name"
            :sortable="true"
            style="width: 35%"
          ></Column>
          <Column
            field="price"
            header="Price"
            :sortable="true"
            style="width: 35%"
          >
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column style="width: 15%">
            <template #header> View </template>
            <template #body>
              <Button
                icon="pi pi-search"
                type="button"
                class="p-button-text"
              ></Button>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="card">
        <div class="flex items-center mb-5 justify-content-between">
          <h5>Best Selling Products</h5>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu2.toggle($event)"
            ></Button>
            <Menu ref="menu2" :popup="true" :model="items"></Menu>
          </div>
        </div>
        <ul class="p-0 m-0 list-none">
          <li
            class="flex mb-4 flex-column md:flex-row md:items-center md:justify-content-between"
          >
            <div>
              <span class="mb-1 mr-2 font-medium text-gray-900 md:mb-0"
                >Space T-Shirt</span
              >
              <div class="mt-1 text-600">Clothing</div>
            </div>
            <div class="flex items-center mt-2 md:mt-0">
              <div
                class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="h-full bg-orange-500" style="width: 50%"></div>
              </div>
              <span class="ml-3 font-medium text-orange-500">%50</span>
            </div>
          </li>
          <li
            class="flex mb-4 flex-column md:flex-row md:items-center md:justify-content-between"
          >
            <div>
              <span class="mb-1 mr-2 font-medium text-gray-900 md:mb-0"
                >Portal Sticker</span
              >
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="flex items-center mt-2 ml-0 md:mt-0 md:ml-8">
              <div
                class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="h-full bg-cyan-500" style="width: 16%"></div>
              </div>
              <span class="ml-3 font-medium text-cyan-500">%16</span>
            </div>
          </li>
          <li
            class="flex mb-4 flex-column md:flex-row md:items-center md:justify-content-between"
          >
            <div>
              <span class="mb-1 mr-2 font-medium text-gray-900 md:mb-0"
                >Supernova Sticker</span
              >
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="flex items-center mt-2 ml-0 md:mt-0 md:ml-8">
              <div
                class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="h-full bg-pink-500" style="width: 67%"></div>
              </div>
              <span class="ml-3 font-medium text-pink-500">%67</span>
            </div>
          </li>
          <li
            class="flex mb-4 flex-column md:flex-row md:items-center md:justify-content-between"
          >
            <div>
              <span class="mb-1 mr-2 font-medium text-gray-900 md:mb-0"
                >Wonders Notebook</span
              >
              <div class="mt-1 text-600">Office</div>
            </div>
            <div class="flex items-center mt-2 ml-0 md:mt-0 md:ml-8">
              <div
                class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="h-full bg-green-500" style="width: 35%"></div>
              </div>
              <span class="ml-3 font-medium text-green-500">%35</span>
            </div>
          </li>
          <li
            class="flex mb-4 flex-column md:flex-row md:items-center md:justify-content-between"
          >
            <div>
              <span class="mb-1 mr-2 font-medium text-gray-900 md:mb-0"
                >Mat Black Case</span
              >
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="flex items-center mt-2 ml-0 md:mt-0 md:ml-8">
              <div
                class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="h-full bg-purple-500" style="width: 75%"></div>
              </div>
              <span class="ml-3 font-medium text-purple-500">%75</span>
            </div>
          </li>
          <li
            class="flex mb-4 flex-column md:flex-row md:items-center md:justify-content-between"
          >
            <div>
              <span class="mb-1 mr-2 font-medium text-gray-900 md:mb-0"
                >Robots T-Shirt</span
              >
              <div class="mt-1 text-600">Clothing</div>
            </div>
            <div class="flex items-center mt-2 ml-0 md:mt-0 md:ml-8">
              <div
                class="overflow-hidden surface-300 border-round w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div class="h-full bg-teal-500" style="width: 40%"></div>
              </div>
              <span class="ml-3 font-medium text-teal-500">%40</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full xl:w-1/2">
      <div class="card">
        <h5>Sales Overview</h5>
        <Chart type="line" :data="lineData" :options="lineOptions" />
      </div>
      <div class="card">
        <div class="flex items-center mb-4 justify-content-between">
          <h5>Notifications</h5>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu1.toggle($event)"
            ></Button>
            <Menu ref="menu1" :popup="true" :model="items"></Menu>
          </div>
        </div>

        <span class="block mb-3 font-medium text-600">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li class="flex items-center py-2 border-bottom-1 surface-border">
            <div
              class="flex items-center justify-center flex-shrink-0 mr-3 bg-blue-100 w-3rem h-3rem border-circle"
            >
              <i class="text-xl text-blue-500 pi pi-dollar"></i>
            </div>
            <span class="text-gray-900 line-height-3"
              >Richard Jones
              <span class="text-700"
                >has purchased a blue t-shirt for
                <span class="text-blue-500">79$</span></span
              >
            </span>
          </li>
          <li class="flex items-center py-2">
            <div
              class="flex items-center justify-center flex-shrink-0 mr-3 bg-orange-100 w-3rem h-3rem border-circle"
            >
              <i class="text-xl text-orange-500 pi pi-download"></i>
            </div>
            <span class="text-700 line-height-3"
              >Your request for withdrawal of
              <span class="font-medium text-blue-500">2500$</span> has been
              initiated.</span
            >
          </li>
        </ul>

        <span class="block mb-3 font-medium text-600">YESTERDAY</span>
        <ul class="p-0 m-0 list-none">
          <li class="flex items-center py-2 border-bottom-1 surface-border">
            <div
              class="flex items-center justify-center flex-shrink-0 mr-3 bg-blue-100 w-3rem h-3rem border-circle"
            >
              <i class="text-xl text-blue-500 pi pi-dollar"></i>
            </div>
            <span class="text-gray-900 line-height-3"
              >Keyser Wick
              <span class="text-700"
                >has purchased a black jacket for
                <span class="text-blue-500">59$</span></span
              >
            </span>
          </li>
          <li class="flex items-center py-2 border-bottom-1 surface-border">
            <div
              class="flex items-center justify-center flex-shrink-0 mr-3 bg-pink-100 w-3rem h-3rem border-circle"
            >
              <i class="text-xl text-pink-500 pi pi-question"></i>
            </div>
            <span class="text-gray-900 line-height-3"
              >Jane Davis
              <span class="text-700"
                >has posted a new questions about your product.</span
              >
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/AppEventBus'
import ProductService from '../service/ProductService'

export default {
  data() {
    return {
      products: null,
      lineData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Revenue',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
          },
          {
            label: 'Sales',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
          }
        ]
      },
      items: [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-minus' }
      ],
      lineOptions: null
    }
  },
  productService: null,
  themeChangeListener: null,
  mounted() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data))

    this.themeChangeListener = (event) => {
      if (event.dark) this.applyDarkTheme()
      else this.applyLightTheme()
    }
    EventBus.on('change-theme', this.themeChangeListener)

    if (this.isDarkTheme()) {
      this.applyDarkTheme()
    } else {
      this.applyLightTheme()
    }
  },
  beforeUnmount() {
    EventBus.off('change-theme', this.themeChangeListener)
  },
  created() {
    this.productService = new ProductService()
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    isDarkTheme() {
      return this.$appState.darkTheme === true
    },
    applyLightTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef'
            }
          }
        }
      }
    },
    applyDarkTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: '#ebedef'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#ebedef'
            },
            grid: {
              color: 'rgba(160, 167, 181, .3)'
            }
          },
          y: {
            ticks: {
              color: '#ebedef'
            },
            grid: {
              color: 'rgba(160, 167, 181, .3)'
            }
          }
        }
      }
    }
  }
}
</script>
